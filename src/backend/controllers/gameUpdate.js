

import router from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";
import { game } from "../modules/game/game";


router.use("/api", koaBody());

router.patch("/api/game/update", async ctx=>{
    const updates = ctx.request.body;

    if (!updates) { return; }

    await game.base.set("", jet.merge(await game.base.get(), updates));

});