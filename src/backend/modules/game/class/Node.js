import jet from "@randajan/jet-core";
import { addSwitches, addVolume, addVolumes } from "../traits";


const { solid, virtual } = jet.prop;

export class Node {

    constructor(ship, name, cfg={}) {
        const {
            powerConsumption
        } = cfg;

        const _p = {}

        solid.all({
            ship
        }, false);

        solid.all(this, {
            name,
        });
        
        addSwitches(this, _p, { isOn:true, isOk:true });
        addVolumes(this, _p, { power:1, health:1 });

    }

    onTick() {
        const { ship } = this;
    }

}