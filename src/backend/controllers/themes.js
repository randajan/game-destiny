

import router from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";
import { themes } from "../modules/game/themes";


router.get("/api/themes", async ctx=>{
    ctx.body = themes.map(t=>Object.jet.extract(t, ["id", "name", "desc"]));
});