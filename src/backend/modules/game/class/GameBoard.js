
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themes } from "../../../../arc/game/themes";
import { rates } from "../../../../arc/game/rates";

const { solid } = jet.prop;

const fits = {
    "":(b, v)=>{
        v.id = b.game.id;
        return v;
    },
    clients:(b, v)=>{
        return v;
    },
    theme:(b, v)=>{
        return themes.find(t=>t.id === v.id); //insecure
    },
    rates:(b, v)=>{
        for (const rate of rates) {
            const vr = v[rate.id] = {...Object.jet.to(v[rate.id]), ...rate};
            vr.value = Math.max(0, Number.jet.to(vr.value)) || 1;
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