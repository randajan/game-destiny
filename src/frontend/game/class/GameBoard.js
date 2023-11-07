import { bridge } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";
import { threadLock } from "../../../arc/tools/threadLock";


const withLock = threadLock();

export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config)=>{

            base.watch("", get=>withLock(async _=>{
                this.set("", await game.emit("gameUpdateBoard", get()));
            }));

        });

        bridge.socket.on("gameUpdateBoard", data => {
            withLock(_=>{ try { this.set("", data); } catch(err) {} });
        });

    }

}