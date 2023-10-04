import fe, { bridge, info } from "@randajan/simple-app/fe";

import jet, { usePromise } from "@randajan/jet-react";
import { BaseAsync } from "@randajan/jet-base";

export const game = new BaseAsync(async base=>{
    const resp = await fetch("/api/game");
    const data = await resp.json();
    await base.set(data);
});


let receiving = false;
bridge.socket.on("game-tick", async (currentState) => {
    receiving = true;
    await game.set(JSON.parse(currentState));
    receiving = false;
});

game.watch("", async (get, cngs) => {
    if (receiving) { return; }

    const updates = Object.fromEntries(await Promise.all(cngs().map(async p => [p, await get(p)])));

    await fetch("/api/game", {
        method: "PATCH",
        body: JSON.stringify(jet.inflate(updates)),
        headers: {
            "Content-Type": "application/json"
        }
    });

});


export const useGame = (path)=>{
    const [gmb, getChanges] = game.use(path);
    const [data, refresh] = usePromise(null, _ => game.get(path), [getChanges]);
    return data;
}
