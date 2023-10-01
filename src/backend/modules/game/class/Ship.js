import jet from "@randajan/jet-core";
import { Node } from "./Node";
import { addVolumes } from "../traits";


const { solid, virtual } = jet.prop;


export class Ship {
    constructor(game, nodes={}) {
        const _p = {};

        solid.all({
            game
        }, false);
        
        solid.all(this, {
            nodes:{}
        });

        addVolumes(this, _p, {
            energy:1,
            health:1,
            distance:1,
            battery:1,
            oxygen:1,
            heat:1,
            direction:1,
            fuel:1
        });

        for (const name in nodes) {
            solid(this.nodes, name, new Node(this, name, nodes[name]))
        }

    }



    mapNodes(callback) {
        return jet.map(this.nodes, callback);
    }

    onTick() {
        //return this.mapNodes(node=>node.onTick());
    }

}
