import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import router from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";

import { events } from "../io";
import { Game } from "../modules/game/class/Game";

// router.use("/api", koaBody());

// router.get("/api/game", async ctx=>{
//     const game = loadOrCreateGame("XYZ");
//     ctx.body = await game.base.get();
// });

// router.patch("/api/game", async ctx=>{
//     const { body } = ctx.request;
//     if (!body) { return; }

//     const game = loadGame("XYZ");
//     await game.base.set("", jet.merge(await game.base.get(), body));

//     ctx.body = await game.base.get("current");


// });

events.use("gameConnect", (socket, { gameId, clientId })=>Game.connect(socket, clientId, gameId));
events.use("gameBoardUpdate", (socket, data)=>Game.find(data?.id).board.set(data));