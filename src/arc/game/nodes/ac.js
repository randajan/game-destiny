export default {
    title:"Klimatizace",
    energyUse:.025,
    enthropy:.08,
    health:_=>Number.jet.rnd(.6, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.heat += rate * node.power * .01;
    }
}