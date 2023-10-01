import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";
import jet from "@randajan/jet-core";

import serve from "koa-static";
import send from 'koa-send';

import router from "./router";
import "./controllers/**"; //setup all routes/controllers
import { Game } from "./modules/game/class/Game";

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) { await send(ctx, info.dir.fe+"/index.html"); }
});

app.use(serve(info.dir.fe));

app.use(router.routes());


const game = new Game({
    onTick:_=>{ be.io.emit("game-tick", JSON.stringify(game)); },
    tickRate:1000
});
game.start();
