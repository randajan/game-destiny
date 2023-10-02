import fe, { bridge, info } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";
import jet from "@randajan/jet-core";
import { createGameBase } from "../../arc/game/gameBase";

export const gameBase = createGameBase();

let receiving = false;
bridge.socket.on("game-tick", async (currentState) => {
    receiving = true;
    await gameBase.set(JSON.parse(currentState));
    receiving = false;
});


gameBase.watch("", async (get, cngs) => {
    if (receiving) { return; }

    const updates = Object.fromEntries(await Promise.all(cngs().map(async p => [p, await get(p)])));

    fetch("/api/game/update", {
        method: "PATCH",
        body: JSON.stringify(jet.inflate(updates)),
        headers: {
            "Content-Type": "application/json"
        }
    });

});




window.gameBase = gameBase;