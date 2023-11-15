
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themesIndex } from "../../../../arc/game/themes";
import { rates } from "../../../../arc/game/rates";

const { solid, virtual } = jet.prop;


export class GameState extends BaseSync {
    constructor(game) {

        super((base, config) => {

            base.fit("", (next, t, f)=>{
                const v = Object.jet.to(next(t));
        
                return v;
            });

            base.watch("", get => { game.emit("gameUpdateState", get()); });

        });

        solid.all(this, {
            game
        }, false);

    }

    update(data) {
        this.set("", data);
        return this.get();
    }
}