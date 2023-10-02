export default {
    title:"Klimatizace",
    energyUse:.1,
    tick:node=>{
        node.ship.heat += node.power * .006;
    }
}