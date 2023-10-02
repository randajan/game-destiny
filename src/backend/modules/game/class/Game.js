import jet from "@randajan/jet-core";
import { createGameBase } from "../../../../arc/game/gameBase";

const { solid, virtual } = jet.prop;

export class Game {
    constructor(cfg={}) {

        const rate = Math.max(0, Number.jet.to(cfg.rate)) || 1;
        const tickRate = Number.jet.frame(Number.jet.to(cfg.tickRate), 100, 60000);
        const onTick = jet.isRunnable(cfg.onTick) ? cfg.onTick : _=>{};

        const _p = {
            status:false,
            tick:0,
            tickRate
        };

        const tick = async _=>{
            if (!_p.status) { return; }
            _p.tick ++;
            await this.onTick();
            await onTick(this);
            setTimeout(tick, tickRate);
        }

        const stop = _=>{
            if (!_p.status) { return false; }
            _p.status = false;
            clearTimeout(_p.int);
            return true;
        }

        const start = _=>{
            if (_p.status) { return false; }
            _p.status = true;
            tick();
            return true;
        }

        const reset = _=>{
            stop();
            _p.base = createGameBase();
            return true;
        }

        solid.all(this, {
            start,
            stop,
            reset
        }, false);

        virtual.all(this, {
            status:_=>_p.status,
            tick:_=>_p.tick,
            base:_=>_p.base,
            rate:_=>rate
        });


        reset();
    }

    async onTick() {
        const { rate, base } = this;
        const ship = await base.get("ship");
        const {state, stats, nodes } = ship;
        if (state === "home" || state === "death") { return; }

        stats.energy = 0;
        stats.battery -= rate * .01;
        stats.direction -= rate * .003;
        stats.health -= rate * .003;
        stats.heat -= rate * .003;
        stats.oxygen -= rate * .003;

        for (const i in nodes) {
            const node = nodes[i];

            //random events
            const luck = (1-node.health)*node.powerSet;
            if (luck && Boolean.jet.rnd(luck*.001)) { console.log("randomEvent", i, "breaker"); node.isOn = false; }
            if (luck && Boolean.jet.rnd(luck*.0005)) { console.log("randomEvent", i, "shortcut"); node.powerSet = Number.jet.rnd(0, 1); }
            if (luck && Boolean.jet.rnd(luck*.0001)) { console.log("randomEvent", i, "explosion"); node.health = 0; }

            const { onTick, isOn, energyUse, powerSet, health, enthropy } = node;

            if (!isOn) { continue; }
            if (health < 0.001 || !powerSet) { node.isOn = false; continue; }

            else if (state === "power" && stats.energy >= energyUse) { stats.energy -= energyUse;}
            else if (state === "battery" && stats.battery >= (energyUse / nodes.battery.capacity)) {
                stats.battery -= (energyUse / nodes.battery.capacity);
            }
            else { node.isOn = false; continue; }

            await onTick(node, stats, ship, rate);

            node.health -= rate * enthropy * (Math.tan(powerSet*1.3) / 200 ); //idk why
        }

        await this.base.set("ship", ship);
    }


}