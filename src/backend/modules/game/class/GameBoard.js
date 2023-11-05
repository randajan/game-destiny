
import jet from "@randajan/jet-core";

import { BaseSync } from "@randajan/jet-base";
import { themes } from "../../../../arc/themes";



export class GameBoard extends BaseSync {
    constructor(game) {
        super((base, config)=>{

            base.fit("theme", (next, t, f)=>{
                const v = Object.jet.to(next(t));

                return themes.find(t=>t.id === v.id); //insecure
            });

            base.fit("clients", (next, t, f)=>{
                const v = Object.jet.to(next(t));

                

                return v;
            });

            base.fit("", (next, t, f)=>{
                const v = Object.jet.to(next(t));

                v.id = game.id;

                return v;
            });

            base.watch("", get=>{ game.emit("gameBoardUpdate", get()); });

        });

    }
}