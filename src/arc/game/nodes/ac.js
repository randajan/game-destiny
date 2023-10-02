export default {
    title:"Klimatizace",
    energyUse:.025,
    enthropy:.08,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.heat += rate * node.power * .01;
    }
}