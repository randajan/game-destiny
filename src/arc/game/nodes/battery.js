export default {
    title:"Záložní zdroj",
    enthropy:.05,
    energyUse:.025,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        if (!ship.nodes.core.isOn) { return; }
        stats.battery = Math.min(1, stats.battery + (rate * node.power * .08));
    },
    capacity:10
}