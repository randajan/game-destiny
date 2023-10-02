export default {
    title:"Generátor kyslíku",
    energyUse:.025,
    enthropy:.12,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.oxygen += rate * node.power * .01;
    }
}