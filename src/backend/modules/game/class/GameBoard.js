
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themes, themesIndex } from "../../../../arc/game/themes";
import { rates } from "../../../../arc/game/rates";

const { solid, virtual } = jet.prop;

const numberRate = v => (Math.max(0, Number.jet.to(v)) || 1);

function calcResistanceRate(crewsCount, minDeathCoefficient = 2) {
    const m = Math.max(1, minDeathCoefficient);
    return Math.max(1, crewsCount * ((crewsCount - m) / (3 * crewsCount)));
}

const fits = {
    "": (b, v) => {
        v = Object.jet.to(v);

        v.enemyRate = calcResistanceRate(v?.crews?.length, 3.5);

        const { theme } = v
        if (!theme) { return v; }

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

        return v;
    },
    id: b => b.game.id,
    theme: (b, v) => themesIndex[v?.id],
    clients: (b, v) => v = Object.jet.to(v),
    rates: (b, v) => {
        v = Object.jet.to(v);
        for (const rate of rates) {
            const vr = v[rate.id] = { ...Object.jet.to(v[rate.id]), ...rate };
            vr.value = numberRate(vr.value);
        }
        return v;
    },
    crews: (b, v) => {
        return Array.jet.to(v).map(c => {
            if (!c) { return; }
            if (!c.name) { c.name = String.jet.rnd(2, 6, -1).jet.capitalize(); }
            return c;
        }).filter(c => c);
    },
    lights: (b, v) => {
        return Array.jet.to(v).filter(c => c);
    },
}


export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config) => {

            for (let i in fits) {
                base.fit(i, (next, t, f) => fits[i](this, next(t), f));
            }

            base.watch("", get => { game.emit("gameUpdateBoard", get()); });

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