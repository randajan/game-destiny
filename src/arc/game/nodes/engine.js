export default {
    title:"Motory",
    energyUse:.15,
    enthropy:.1,
    health:_=>Number.jet.rnd(0, .2),
    onTick:(node, stats, ship, rate)=>{
        stats.distance -= rate * node.power * .0005 * (stats.direction * 2 - 1);
        //stats.fuel -= rate * node.powerSet * .0005;
    }
}