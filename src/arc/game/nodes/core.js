

export default {
    title:"Reaktor",
    enthropy:.25,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.energy = Math.min(1, stats.energy + node.power);
    }
}