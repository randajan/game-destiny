
export default {
    id:"spaceship",
    name:"Spaceship",
    colors:["black", "white", "orange"],
    onChange: async (game, ticker)=>{
        const { solid:{ stages }, current:{ pause, restart, stage } } = game;

        const { isEnd, isWin } = stages[stage];

        if (restart) { ticker.restart(); }
    },
    onTick: async (game, ticker)=>{
        const { solid:{ rates, stages }, current:{ pause, stage, stats, nodes } } = game;

        const { isEnd } = stages[stage];
        if (isEnd) { return; }
        
        if (pause) {
            for (const i in nodes) { nodes[i].isMw = false; }
            return game;
        }

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

            let { onTick, isMw, isOn, energyUse, powerSet, health, decay } = node;

            //random events
            const luck = q*(1-health)*powerSet;
            if (luck > 0) {
                if (Boolean.jet.rnd(luck*.0005)) { node.isMw = isMw = !isMw; }
                if (Boolean.jet.rnd(luck*.0004)) { node.isOn = isOn = !isOn; }
                if (Boolean.jet.rnd(luck*.0003)) { node.powerSet = powerSet = Number.jet.rnd(0, 1); }
                if (Boolean.jet.rnd(luck*.0002)) { node.health = health = 0; }
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

        return game;
    }
}