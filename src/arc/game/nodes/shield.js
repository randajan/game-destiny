export default {
    title:"Štíty",
    enthropy:.075,
    energyUse:.1,
    powerSet:_=>Number.jet.rnd(.6, 1),
    health:_=>Number.jet.rnd(.6, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.health += rate * node.power * .008;
    }
}