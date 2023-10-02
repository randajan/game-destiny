export default {
    title:"Navigace",
    energyUse:.075,
    enthropy:.25,
    powerSet:_=>0,
    health:_=>Number.jet.rnd(0, .2),
    onTick:(node, stats, ship, rate)=>{
        stats.direction += rate * node.power * .01;
    }
}