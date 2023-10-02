export default {
    title:"Motory",
    energyUse:.1,
    enthropy:.1,
    powerSet:_=>Number.jet.rnd(.4, 1),
    health:_=>Number.jet.rnd(.4, 1),
    onTick:(node, stats, ship, rate)=>{
        stats.distance -= rate * node.power * .0005 * (stats.direction * 2 - 1);
        //stats.fuel -= rate * node.powerSet * .0005;
    }
}