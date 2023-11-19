
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themes, themesIndex } from "../themes";
import { rates } from "../rates";
import { mods } from "../mods";
import testCrews from "./testCrews.json";


import { fceSure, numFrame, numNo0Or1, strSure } from "../../../../arc/tools/formats";
import { uniqueRnd } from "../../../../arc/tools/uniqueRnd";



const { solid, virtual } = jet.prop;

const calcResistanceRate = (crewsCount, minDeathCoefficient = 2)=>{
    if (!crewsCount) { return 0; }
    const m = Math.max(1, minDeathCoefficient);
    return Math.max(1, crewsCount * ((crewsCount - m) / (3 * crewsCount)));
}

export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config) => {

            base.fit("id", (next, t, f)=>game.id);

            base.fit("phase.id", (next, t, f)=>Number.jet.to(next(t)));
            base.fit("clients", (next, t, f)=>Object.jet.to(next(t)));
            base.fit("theme", (next, t, f)=>{
                const theme = themesIndex[next(t)?.id] || themes[0];

                for (const n of theme.nodes) {
                    n.title = strSure(n.title, n.id);
                    n.info = strSure(n.info, n.title);
                    n.rateEnergyUse = numNo0Or1(n.rateEnergy);
                    n.rateDecay = numNo0Or1(n.rateDecay);
                    n.ratePower = numNo0Or1(n.ratePower);
                    n.onTick = fceSure(n.onTick);
                }
        
                for (const s of theme.stats) {
                    s.title = strSure(s.title, s.id);
                    s.info = strSure(s.info, s.title);
                    s.unit = Array.jet.to(s.unit) || [0, 100, "%"];
                    s.entropy = numFrame(s.entropy, -1);
                    s.rateEntropy = numNo0Or1(s.rateEntropy);
                }

                return theme;
            });

            base.fit("mods", (next, t, f)=>{
                const v = Object.jet.to(next(t));
                for (const mod of mods) {
                    const vm = v[mod.id] = { ...Object.jet.to(v[mod.id]), ...mod };
                    vm.active = vm.active == null ? true : Boolean.jet.to(vm.active);
                }
                return v;
            });

            base.fit("rates", (next, t, f)=>{
                const v = Object.jet.to(next(t));
                for (const rate of rates) {
                    const vr = v[rate.id] = { ...Object.jet.to(v[rate.id]), ...rate };
                    vr.value = numNo0Or1(vr.value);
                }
                return v;
            });

            base.fit("crews", (next, t, f)=>{
                //return testCrews;
                const v = Object.jet.to(next(t));

                delete v.minName;
                delete v.maxName;
                v.isReady = true;

                v.list = Array.jet.to(v.list).map((c, id) => {
                    if (!c) { return; }
                    c.id = id;
                    if (!c.name) { c.name = String.jet.rnd(2, 6, -1).jet.capitalize(); }
                    const cnl = c.name.length;
                    v.minName = v.minName ? Math.min(v.minName, cnl) : cnl;
                    v.maxName = v.maxName ? Math.max(v.maxName, cnl) : cnl;
                    v.isReady = v.isReady && c.isReady;
                    return c;
                }).filter(c => c);

                v.count = v?.list?.length || 0;
                const enemyRate = calcResistanceRate(v.count, 3.5);
        
                v.countAlly = v.count - Math.ceil(enemyRate);
                v.countEnemy = Math.floor(enemyRate);
                v.wildChance = enemyRate % 1;
        
                return v;
            });

            base.fit("", (next, t, f)=>{
                //return testBoard;
                const v = Object.jet.to(next(t));

                const { theme, phase } = v;

                if (phase) {
                    const fid = f?.phase?.id;

                    const ready = phase.ready = [ true ];
                    ready[0] = true;
                    ready[1] = (!!theme && v.crews.count >= 5);
                    ready[2] = v.crews.isReady;

                    for (let i in ready) { ready[i] = (ready[i] && (i == 0 || ready[i-1])); }

                    if (phase.id > fid && !ready[phase.id]) { phase.id = fid; }
    
                    if (phase.id == 1 && fid == 0) {
                        const { countAlly, countEnemy, wildChance, list } = v.crews;
                        const mask = Array.jet.shuffle([Boolean.jet.rnd(1-wildChance), ...Array(countAlly).fill(true), ...Array(countEnemy).fill(false)]);
                        
                        const codeFactory = uniqueRnd(_=>Number.jet.rnd(0, 999).toFixed().padStart(3, "0"));
                        v.crews.list = list.map((c, i)=>{

                            c.isAlly = mask[i];
                            c.code = codeFactory();
                            c.isReady = false;
                            return c;
                        });
                    }
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
                        n.client = nodesClients[n.id]?.clientId;
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
        this.set("", jet.merge(this.get(), data));
        return this.get();
    }
}