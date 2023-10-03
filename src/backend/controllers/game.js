

import router from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";

import { loadOrCreateGame } from "../modules/game";


router.use("/api", koaBody());

router.get("/api/game", async ctx=>{
    const game = loadOrCreateGame("XYZ");
    ctx.body = await game.base.get();
});

router.patch("/api/game", async ctx=>{
    const { body } = ctx.request;
    if (!body) { return; }

    const game = loadOrCreateGame("XYZ");
    await game.base.set("", jet.merge(await game.base.get(), body));

});