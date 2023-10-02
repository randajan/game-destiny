export default {
    title:"Záložní zdroj",
    energyUse:.1,
    tick:node=>{
        node.ship.heat += node.power * .08;
    }
}