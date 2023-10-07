import jet from "@randajan/jet-core";
import { BaseAsync } from "@randajan/jet-base";

export class GameBase extends BaseAsync {

    constructor(onInit) {
        super(async (base, opt)=>{

            const { rates, stats, nodes, states } = opt;
            const seed = jet.uid(16);
        
            for (const node of nodes) {
                const id = node.id;
                const title = String.jet.to(node.title) || id;
                const info = String.jet.to(node.info) || title;

                const onTick = jet.isRunnable(node.onTick) ? node.onTick : _=>{};
                const isOn = node.isOn != null ? node.isOn : true;
                const energyUse = Number.jet.frame(Number.jet.to(node.energyUse), 0, 1);
                const decay = Number.jet.frame(Number.jet.to(node.decay), 0, 1);
                const health = Number.jet.frame(Number.jet.to(node.health), 0, 1);
                const capacity = Math.max(0, Number.jet.to(node.capacity));

                base.fit(["solid.nodes", id], _=>({id, title, info, stat:node.stat, onTick}));
                base.fit(["current.nodes", id], (next, f)=>{
                    const v = Object.jet.tap(next(f));
                    v.onTick = onTick;
                    v.isOn = Boolean.jet.to(v.isOn);
                    v.isMw = Boolean.jet.to(v.isMw);
                    v.health = Number.jet.frame(Number.jet.to(v.health), 0, 1);
                    v.powerSet = Number.jet.frame(Number.jet.to(v.powerSet), 0, 1);
            
                    v.power = v.powerSet * v.health;
                    v.energyUse = v.powerSet * energyUse;
                    v.decay = v.powerSet * decay;
                    v.capacity = v.health * capacity;
                    
                    return v;
                });
        
                base.set(["current.nodes", id], {
                    isOn,
                    health,
                    powerSet:Math.max(.2, (1-health)*1.2),
                    capacity
                });
        
            }
        
            for (const stat of stats) {
                const id = stat.id;
                const init = stat.init || 1;
                const title = String.jet.to(stat.title) || id;
                const info = String.jet.to(stat.info) || title;
                const unit = Array.jet.to(stat.unit) || [0, 100, "%"];

                const entropy = Number.jet.to(stat.entropy);

                base.fit(["solid.stats", id], _=>({id, title, info, unit}));
                base.fit(["current.stats", id], (next, f)=>{
                    const v = Object.jet.tap(next(f));
                    v.entropy = entropy;
                    v.value = Number.jet.round(Number.jet.frame(Number.jet.to(v.value), 0, 1), 4);
                    return v;
                });
        
                base.set(["current.stats", id, "value"], init);
            }

            for (let id in rates) { base.fit(["solid.rates", id], (next, f)=>Math.max(0, Number.jet.to(next(f))) || rates[id]); }
            base.set("solid.rates", rates);

            const statesIndex = {};
            for (const state of states) { statesIndex[state.id] = state; }

            base.fit("solid.states", _=>statesIndex);
            base.fit("current", (next, f)=>{
                f = next(f);
                const v = Object.jet.tap(f);
                v.state = states.find(({ when })=>when(v)).id;
                v.pause = Boolean.jet.to(v.pause);
                v.restart = Boolean.jet.to(v.restart);
                v.seed = seed;
                return v;
            });

            if (jet.isRunnable(onInit)) { return onInit(base, opt); }
        })
    }
}