import { setRealLights, setRealLightsEnd } from "../../class/Shelly";

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
        if (stage.isEnd || (s.pause && mods.withPause.active)) { //paused or end
            for (const node of nodes) { const n = s.nodes[node.id]; n.isMw = n.isKill = false; }
            if (stage.isEnd) { s.pause = false; setRealLightsEnd(stage.isWin); }
            else { setRealLights(1); }
            return s;
        }

        //rates
        const { speed, entropy, decay, unluck } = rates;
        const refresh = game.ticker.interval / 1000;

        const q = refresh * speed.value;
        const qe = q * entropy.value;
        const qd = q * decay.value;
        const qu = q * unluck.value;

        //stats
        for (const { id, rateEntropy, entropy } of stats) {
            const stat = s.stats[id];
            stat.value = entropy === 1 ? 0 : (stat.value - qe * rateEntropy * entropy);
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
                if (isOn && isMw && Boolean.jet.rnd(ul*.2)) { n.isKill = true; }
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

        if ((game.ticker.count % 5) === 1) {
            const { light } = s.nodes;
            setRealLights(light.isOn ? light.power : 0);
        }

        return s
    }
}