import { bridge } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";
import { threadLock } from "../../config/tools";

const withLock = threadLock();

export class GameBoard extends BaseSync {
    constructor(game) {

        super((base, config)=>{

            base.watch("", get=>withLock(_=>game.emit("gameBoardUpdate", get())));

        });

        bridge.socket.on("gameBoardUpdate", data => {
            withLock(_=>{ try { this.set("", data); } catch(err) {} });
        });

    }
}