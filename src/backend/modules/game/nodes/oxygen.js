export default {
    title:"Generátor kyslíku",
    energyUse:.1,
    tick:node=>{
        node.ship.oxygen += node.power * .006;
    }
}