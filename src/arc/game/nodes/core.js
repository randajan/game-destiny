

export default {
    title:"Reaktor",
    enthropy:.25,
    health:_=>Number.jet.rnd(.4, .8),
    onTick:(node, stats, ship, rate)=>{
        stats.energy = Math.min(1, stats.energy + node.power);
    }
}