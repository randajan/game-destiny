
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { bolOrTrue, numFrame } from "../../../../arc/tools/formats";

const { solid, virtual } = jet.prop;


export class GameState extends BaseSync {
    constructor(game) {

        super((base, config) => {
            const { theme:{ stats, nodes, stages }, crews } = game.board.get("");

            const seed = jet.uid(16);
            base.fit("seed", _=>seed);
            base.fit("pause", (next, t)=>Boolean.jet.to(next(t)));
            base.fit("tick", (next, t)=>game.ticker.count);
        
            for (const node of nodes) {
                const id = node.id;
                const isOn = node.isOn != null ? node.isOn : true;
                const energyUse = numFrame(node.energyUse);
                const decay = numFrame(node.decay);
                const health = numFrame(node.health);
                const capacity = numFrame(node.capacity);

                base.fit(["nodes", id], (next, t)=>{
                    const v = Object.jet.tap(next(t));
                    v.isOn = Boolean.jet.to(v.isOn);
                    v.isMw = Boolean.jet.to(v.isMw);
                    v.health = numFrame(v.health);
                    v.powerSet = numFrame(v.powerSet);
            
                    v.power = v.powerSet * v.health;
                    v.energyUse = v.powerSet * energyUse;
                    v.decay = v.powerSet * decay;
                    v.capacity = v.health * capacity;
                    
                    return v;
                });
        
                base.set(["nodes", id], {
                    isOn,
                    health,
                    powerSet:Math.max(.2, (1-health)*1.2)
                });
        
            }

            for (const stat of stats) {
                const id = stat.id;
                const init = numFrame(stat.init) || 1;

                base.fit(["stats", id], (next, t)=>{
                    const v = Object.jet.tap(next(t));
                    v.value = numFrame(v.value);
                    return v;
                });
        
                base.set(["stats", id, "value"], init);
            }

            for (const c of crews.list) {
                base.fit(["crews", "list", c.id], (next, t)=>{
                    const v = Object.jet.tap(next(t));
                    v.id = c.id;
                    v.isAlive = bolOrTrue(v.isAlive);
                    return v;
                });
            }

            base.fit("", (next, t)=>{
                const v = Object.jet.tap(next(t));
                v.stage = stages.find(({ when })=>when(v)).id;
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