import { nodes } from "./nodes";
import { rates } from "./rates";
import { states } from "./states";
import { stats } from "./stats";
import { setRealLights, setRealLightsEnd, setRealVent } from "../../../../../lights";

export const gameConfig = {
    rates,
    stats,
    nodes,
    states,
    onChange: async (game, ticker)=>{
        const { solid:{ states }, current:{ pause, restart, state } } = game;

        const { isEnd, isWin } = states[state];

        if (restart) { ticker.restart(); }
        else if (isEnd) { await setRealLightsEnd(isWin); ticker.stop(); }
        else if (pause) { await setRealLights(1); }
    },
    onTick: async (game, ticker)=>{
        const { solid:{ rates, states }, current:{ pause, state, stats, nodes } } = game;

        const { isEnd } = states[state];
        if (isEnd) { return; }
        
        if (pause) {
            for (const i in nodes) { nodes[i].isMw = false; }
            return game;
        }

        const { refresh, refreshShelly, speed, entropy, decay, unluck } = rates;

        const q = refresh * speed;
        const qe = q * entropy;
        const qd = q * decay;

        for (const i in stats) {
            const stat = stats[i];
            stat.value = Number.jet.frame(stat.value - qe * stat.entropy, 0, 1);
        }

        const { energy, battery } = stats;
        
        for (const i in nodes) {
            const node = nodes[i];

            let { onTick, isMw, isOn, energyUse, powerSet, health, decay } = node;

            //random events
            const ul = q*unluck*(1-health)*powerSet;
            if (ul > 0) {
                if (Boolean.jet.rnd(ul*.004)) { node.health = health = 0; }
                if (Boolean.jet.rnd(ul*.006)) { node.powerSet = powerSet = Number.jet.rnd(0, 1); }
                if (Boolean.jet.rnd(ul*.008)) { node.isOn = isOn = !isOn; }
                if (isOn && isMw && Boolean.jet.rnd(ul*.1)) { node.isKill = true; }
            }

            if (!isOn) { continue; }
            if (health < 0.001) { node.isOn = false; continue; }

            if (nodes.core.isOn && energy.value >= energyUse) { energy.value -= energyUse;}
            else if (nodes.battery.isOn && battery.value >= (energyUse / nodes.battery.capacity)) {
                nodes.core.isOn = false; //core overloaded shutdown
                battery.value -= (energyUse / nodes.battery.capacity);
            }
            else if (!node.capacity || !battery.value) { node.isOn = false; continue; }

            await onTick(game.current, node, q);

            node.health -= qd * decay * (Math.tan(powerSet*1.3) / 200 ); //idk why
        }

        if (ticker.count % refreshShelly === 1) {
            const { light, engine } = nodes;
            await setRealLights(light.isOn ? light.power : 0);
            await setRealVent(engine.isOn);
        }

        return game;
    }
}