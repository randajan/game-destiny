import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import { Game } from "./class/Game";


export const game = new Game({
    rate:1,
    tickRate:200,
    onTick:async _=>{ be.io.emit("game-tick", JSON.stringify(await game.base.get())); },
});

game.start();
