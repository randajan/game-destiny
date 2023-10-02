export default {
    title:"Záložní zdroj",
    enthropy:.05,
    energyUse:.001,
    health:_=>Number.jet.rnd(.8, 1),
    onTick:(node, stats, ship, rate)=>{
        if (!ship.nodes.core.isOn) { return; }
        stats.battery = Math.min(1, stats.battery + (rate * node.power * .08));
    },
    capacity:300
}