import { bridge } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";
import { threadLock } from "../../../arc/tools/threadLock";
import { store } from "../../config/bases";

const boardLock = threadLock();
const clientLock = threadLock();

export class GameBoard extends BaseSync {
    constructor(game) {
        const clientId = store.get("client.id");

        super((base, config)=>{

            base.watch("", (get, cngs)=>{
                if (!game.isConnected) { return; }
                boardLock(async _=>{
                    const data = Object.fromEntries(cngs().map(p => [p, get(p)]));
                    this.set("", await game.emit("gameUpdateBoard", { id:get("id"), data }));
                });
            });

            base.watch(["clients", clientId], get=>{
                clientLock(_=>{ store.set("client", get()); });
            });

            store.watch("client", get=>{
                clientLock(_=>{ base.set(["clients", clientId], get()); });
            });

        });


        bridge.socket.on("gameUpdateBoard", data => {
            
            if (!game.isConnected) { return; }
            boardLock(_=>{ this.set("", data); });
            
        });

    }

}