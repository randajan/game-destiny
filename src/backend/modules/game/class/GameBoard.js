
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themesIndex } from "../../../../arc/game/themes";
import { rates } from "../../../../arc/game/rates";

const { solid, virtual } = jet.prop;

const numberRate = v => (Math.max(0, Number.jet.to(v)) || 1);

const calcResistanceRate = (crewsCount, minDeathCoefficient = 2)=>{
    const m = Math.max(1, minDeathCoefficient);
    return Math.max(1, crewsCount * ((crewsCount - m) / (3 * crewsCount)));
}

export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config) => {

            base.fit("id", (next, t, f)=>game.id);

            base.fit("phase", (next, t, f)=>Number.jet.frame(Number.jet.to(next(t)), 0, 2));
            base.fit("theme", (next, t, f)=>themesIndex[next(t)?.id]);
            base.fit("clients", (next, t, f)=>Object.jet.to(next(t)));

            base.fit("rates", (next, t, f)=>{
                const v = Object.jet.to(next(t));
                for (const rate of rates) {
                    const vr = v[rate.id] = { ...Object.jet.to(v[rate.id]), ...rate };
                    vr.value = numberRate(vr.value);
                }
                return v;
            });

            base.fit("crews", (next, t, f)=>{
                const v = Object.jet.to(next(t));

                delete v.minName;
                delete v.maxName;

                v.list = Array.jet.to(v.list).map(c => {
                    if (!c) { return; }
                    if (!c.name) { c.name = String.jet.rnd(2, 6, -1).jet.capitalize(); }
                    const cnl = c.name.length;
                    v.minName = v.minName ? Math.min(v.minName, cnl) : cnl;
                    v.maxName = v.maxName ? Math.max(v.maxName, cnl) : cnl;
                    return c;
                }).filter(c => c);

                v.count = v?.list?.length || 0;
                const enemyRate = calcResistanceRate(v.count, 3.5);
        
                v.countAlly = v.count - Math.ceil(enemyRate);
                v.countEnemy = Math.floor(enemyRate);
                v.wildChance = enemyRate % 1;
        
                return v;
            });

            base.fit("lights.list", (next, t, f)=>{
                return Array.jet.to(next(t)).filter(c => c);
            });

            base.fit("", (next, t, f)=>{
                const v = Object.jet.to(next(t));

                const { theme } = v;

                if (v.phase == 1 && f.phase === 0) {
                    const { countAlly, countEnemy, wildChance, list } = v.crews;
                    const mask = Array.jet.shuffle([Boolean.jet.rnd(1-wildChance), ...Array(countAlly).fill(true), ...Array(countEnemy).fill(false)]);
                    v.crews.list = list.map((c, i)=>{
                        c.isAlly = mask[i];
                        c.code = Number.jet.rnd(0, 999).toFixed().padStart(3, "0");
                        c.isReady = false;
                        return c;
                    });
                }

                if (theme) {
                    const nodesClients = {};
                    for (let clientId in v.clients) {
                        const client = v.clients[clientId];
                        const { id, setAt } = jet.digOut(client, ["game", theme.id, "node"], {});
                        const f = nodesClients[id] || {};
                        if (id && !(setAt < f.setAt)) { nodesClients[id] = { setAt, clientId }; }
                    }
            
                    for (const n of theme.nodes) {
                        n.rateEnergyUse = numberRate(n.rateEnergy);
                        n.rateDecay = numberRate(n.rateDecay);
                        n.ratePower = numberRate(n.ratePower);
                        n.client = nodesClients[n.id]?.clientId;
                    }
            
                    for (const s of theme.stats) {
                        s.rateEntropy = numberRate(s.rateEntropy);
                    }
                }
        
                return v;
            });

        });

        solid.all(this, {
            game
        }, false);

    }

    update(data) {
        this.set("", data);
        return this.get();
    }
}