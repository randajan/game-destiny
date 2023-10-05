import { nodes } from "./nodes";
import { rates } from "./rates";
import { states } from "./states";
import { stats } from "./stats";



export const gameConfig = {
    rates,
    stats,
    nodes,
    states,
    onTick: async (game, ticker)=>{
        const { solid:{ rates, states }, current:{ state, stats, nodes } } = game;

        if (states[state].isEnd) { return; }

        const { refresh, speed, entropy, decay } = rates;

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

            let { onTick, isOn, energyUse, powerSet, health, decay } = node;

            //random events
            const luck = (1-health)*powerSet;
            if (luck && Boolean.jet.rnd(luck*.001)) { node.isOn = isOn = !isOn; }
            if (luck && Boolean.jet.rnd(luck*.0005)) { node.powerSet = powerSet = Number.jet.rnd(0, 1); }
            if (luck && Boolean.jet.rnd(luck*.0001)) { node.health = health = 0; }

            if (!isOn) { continue; }
            if (health < 0.001 || !powerSet) { node.isOn = false; continue; }

            if (nodes.core.isOn && energy.value >= energyUse) { energy.value -= energyUse;}
            else if (nodes.battery.isOn && battery.value >= (energyUse / nodes.battery.capacity)) {
                nodes.core.isOn = false; //core overloaded shutdown
                battery.value -= (energyUse / nodes.battery.capacity);
            }
            else if (!node.capacity || !battery.value) { node.isOn = false; continue; }

            await onTick(game.current, node, q);

            node.health -= qd * decay * (Math.tan(powerSet*1.3) / 200 ); //idk why
        }

        return game;
    }
}