export default {
    title:"Navigace",
    energyUse:.05,
    enthropy:.05,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.direction += rate * node.power * .007;
    }
}