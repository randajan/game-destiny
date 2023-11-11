
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themes, themesIndex } from "../../../../arc/game/themes";
import { rates } from "../../../../arc/game/rates";

const { solid, virtual } = jet.prop;

const numberRate = v=>(Math.max(0, Number.jet.to(v)) || 1);

const fits = {
    "":(b, v)=>{
        v.id = b.game.id;
        
        const { theme } = v;
        if (!theme) { return v; }

        for (const s of theme.stats) {
            s.rateEntropy = numberRate(s.rateEntropy);
        }

        const nodesClients = {};
        for (let clientId in v.clients) {
            const client = v.clients[clientId];
            const nodeId = (client?.game?.themes || {})[theme.id]?.nodeId; //cached node of the client
            if (!nodesClients[nodeId]) { nodesClients[nodeId] = clientId; }
        }

        for (const n of theme.nodes) {
            n.rateEnergyUse = numberRate(n.rateEnergy);
            n.rateDecay = numberRate(n.rateDecay);
            n.ratePower = numberRate(n.ratePower);
            n.client = nodesClients[n.id];
        }

        return v;
    },
    theme:(b, v)=>{
        console.log("Aaa", v.id);
        return themesIndex[v.id];
    },
    clients:(b, v)=>v,
    crews:(b, v)=>v,
    rates:(b, v)=>{
        for (const rate of rates) {
            const vr = v[rate.id] = {...Object.jet.to(v[rate.id]), ...rate};
            vr.value = numberRate(vr.value);
        }
        return v;
    }
}


export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config)=>{

            for (let i in fits) {
                base.fit(i, (next, t, f)=>fits[i](this, Object.jet.to(next(t)), f));
            }

            base.watch("", get=>{ game.emit("gameUpdateBoard", get()); });

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