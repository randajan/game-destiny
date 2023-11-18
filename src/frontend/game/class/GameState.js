import { bridge } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";
import { threadLock } from "../../../arc/tools/threadLock";
import { store } from "../../config/bases";

const stateLock = threadLock();

export class GameState extends BaseSync {
    constructor(game) {

        super((base, config)=>{

            base.watch("", (get, cngs)=>{
                if (!game.isConnected) { return; }
                stateLock(async _=>{
                    const data = Object.fromEntries(cngs().map(p => [p, get(p)]));
                    this.set("", await game.emit("gameUpdateState", {id:game.board.get("id"), data}));
                });
            });

        });


        bridge.socket.on("gameUpdateState", data => {
            if (!game.isConnected) { return; }
            stateLock(_=>{ this.set("", data); });
        });

    }

}