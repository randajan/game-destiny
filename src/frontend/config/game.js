import fe, { bridge, info } from "@randajan/simple-app/fe";

import jet, { usePromise } from "@randajan/jet-react";
import { BaseAsync } from "@randajan/jet-base";

export const game = new BaseAsync(async base=>{
    const resp = await fetch("/api/game");
    const data = await resp.json();
    await base.set(data);
});

//solve sync glitch problem
const phase = {
    tickId:null,
    pending:"",
}

bridge.socket.on("game-tick", async (currentState) => {
    if (phase.pending) { return; }
    phase.pending = "tick";
    try { await game.set("current", JSON.parse(currentState)); } catch(err) {}
    
    delete phase.pending;
});

game.watch("", async (get, cngs) => {
    if (phase.pending) { return; }
    phase.pending = "update";

    try {
        const updates = Object.fromEntries(await Promise.all(cngs().map(async p => [p, await get(p)])));

        const resp = await fetch("/api/game", {
            method: "PATCH",
            body: JSON.stringify(jet.inflate(updates)),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        await game.set("current", await resp.json());

    } catch(err) {}

    delete phase.pending;
});


export const useGame = (path)=>{
    const [gmb, getChanges] = game.use(path);
    const [data, refresh] = usePromise(null, _ => game.get(path), [getChanges]);
    return data;
}
