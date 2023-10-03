import jet from "@randajan/jet-core";
import { BaseAsync } from "@randajan/jet-base";

export class GameBase extends BaseAsync {

    constructor(onInit) {
        super(async (base, opt)=>{

            const { rates, stats, nodes } = opt;
        
            for (const node of nodes) {
                const id = node.id;
                const isOn = node.isOn != null ? node.isOn : true;
                const title = String.jet.to(node.title) || id;
                const onTick = jet.isRunnable(node.onTick) ? node.onTick : _=>{};
                const energyUse = Number.jet.frame(Number.jet.to(node.energyUse), 0, 1);
                const decay = Number.jet.frame(Number.jet.to(node.decay), 0, 1);
                const health = Number.jet.frame(Number.jet.to(node.health), 0, 1);
        
                base.fit(["ship.nodes", id], (next, f)=>{
                    f = next(f);
                    const v = Object.jet.tap(f);
                    v.id = id;
                    v.title = title,
                    v.onTick = onTick;
                    v.isOn = Boolean.jet.to(v.isOn);
                    v.health = Number.jet.frame(Number.jet.to(v.health), 0, 1);
                    v.powerSet = Number.jet.frame(Number.jet.to(v.powerSet), 0, 1);
            
                    v.power = v.powerSet * v.health;
                    v.energyUse = v.powerSet * energyUse;
                    v.decay = v.powerSet * decay;
                    
                    return v;
                });
        
                base.set(["ship.nodes", id], {
                    isOn,
                    health,
                    powerSet:Math.max(.2, (1-health)*1.2),
                    capacity:Number.jet.only(node.capacity)
                });
        
            }
        
            for (const stat of stats) {
                const id = stat.id;
                const init = stat.init || 1;
                const title = String.jet.to(stat.title) || id;
                const entropy = Number.jet.to(stat.entropy);

                base.fit(["ship.stats", id], (next, f)=>{
                    f = next(f);
                    const v = Object.jet.tap(f);
                    v.id = id;
                    v.title = title,
                    v.entropy = entropy;
                    v.value = Number.jet.round(Number.jet.frame(Number.jet.to(v.value), 0, 1), 4);
                    return v;
                });
        
                base.set(["ship.stats", id, "value"], init);
            }
        
            base.fit("ship", (next, f)=>{
                f = next(f);
                const v = Object.jet.tap(f);
                const {  nodes:{core, battery} } = v;
                v.state = core.isOn ? "power" : battery.isOn ? "battery" : "blackout";
                return v;
            });

            for (let id in rates) { base.fit(["rates", id], (next, f)=>Math.max(0, Number.jet.to(next(f))) || rates[id]); }
            base.set("rates", rates);

            base.fitTo("pause", "Boolean");

            if (jet.isRunnable(onInit)) { return onInit(base, opt); }
        })
    }
}