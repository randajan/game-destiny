

import router from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";


import { themes } from "../../arc/themes";

router.get("/api/themes", async ctx=>{
    ctx.body = themes.map(t=>Object.jet.extract(t, ["id", "name", "desc"]));
});

router.patch("/api/theme/:themeId", async ctx=>{
    const { themeId } = ctx.params

    ctx.body = themes.find(t=>t.id === themeId);
});