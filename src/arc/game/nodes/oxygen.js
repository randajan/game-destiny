export default {
    title:"Generátor kyslíku",
    energyUse:.025,
    enthropy:.12,
    health:_=>Number.jet.rnd(.6, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.oxygen += rate * node.power * .01;
    }
}