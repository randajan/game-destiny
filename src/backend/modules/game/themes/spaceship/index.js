import { numFrame } from "../../../../../arc/tools/formats";

export default {
    id:"spaceship",
    name:"Spaceship",
    onTick: (game)=>{
        const board = game.board.get();
        const s = game.state.get();

        const { mods, rates, theme: { stages, nodes, stats } } = board;

        const stage = stages.find(x=>x.id === s.stage);

        //breaks
        if (!stage) { return; }
        if (stage?.isEnd) { game.ticker.stop(); return s; } //stop game on end
        if (s.pause && mods.withPause.active) { //paused
            for (const n of nodes) { s.nodes[n.id].isMw = false; }
            return s;
        }

        //rates
        const { speed, entropy, decay, energyUse, unluck } = rates;
        const refresh = game.ticker.interval / 1000;

        const q = refresh * speed.value;
        const qe = q * entropy.value;
        const qd = q * decay.value;
        const qu = q * unluck.value;

        //stats
        for (const { id, rateEntropy, entropy } of stats) {
            const stat = s.stats[id];
            stat.value = numFrame(stat.value - qe * rateEntropy * entropy);
        }

        //nodes
        const { energy, battery } = s.stats;
        
        for (const node of nodes) {
            const { id, rateDecay, decay, onTick } = node;
            const n = s.nodes[id];
            let { isMw, isOn, energyUse, powerSet, health, capacity } = n;           

            //random events
            const ul = qu*(1-health)*powerSet;
            if (ul > 0) {
                if (Boolean.jet.rnd(ul*.004)) { n.health = health = 0; }
                if (Boolean.jet.rnd(ul*.006)) { n.powerSet = powerSet = Number.jet.rnd(0, 1); }
                if (Boolean.jet.rnd(ul*.008)) { n.isOn = isOn = !isOn; }
                if (isOn && isMw && Boolean.jet.rnd(ul*.1)) { n.isKill = true; }
            }

            if (!isOn) { continue; }
            if (health < .001) { n.isOn = false; continue; }


            if (s.nodes.core.isOn && energy.value >= energyUse) { energy.value -= energyUse; }
            else if (s.nodes.battery.isOn && battery.value >= (energyUse / s.nodes.battery.capacity)) {
                s.nodes.core.isOn = false; //core overloaded
                battery.value -= (energyUse / s.nodes.battery.capacity);
            }
            else if (!capacity || !battery.value) { n.isOn = false; continue; }

            onTick(s, n, q);

            n.health -= qd * rateDecay * decay * (Math.tan(powerSet*1.3) / 200 ); //idk why
        }

        return s
    }
}