


import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import router, { apiError } from "../router";
import { koaBody } from "koa-body";
import jet from "@randajan/jet-core";

import { db } from "../db/ramdb";

import bcrypt from "bcrypt";

const _passwordRequirments = {
    short:/.{8,}/,
    symbols:/[^a-zA-Z0-9]/,
    numbers:/[0-9]/,
    lowerCase:/[a-z]/,
    upperCase:/[A-Z]/
}

const validatePassword = (password)=>{
    const p = String.jet.to(password);
    return jet.forEach(_passwordRequirments, (rg, k)=>{ if (!rg.test(p)) { return k; } });
}

router.use("/api/acc", koaBody());
router.post("/api/acc/signin", async ctx=>{
    const { username, password } = ctx.request.body;

    const tbl = await db("sys_accs");

    const acc = (await tbl.rows.getChop("username").getList(username))[0];
    const check = !acc ? false : await bcrypt.compare(password, (await acc("password")));
    if (!check) { throw apiError(401, `invalid credentials`); }

    ctx.body = await tbl.cols.map(async c=>c.display > 0 ? acc(c) : null, { byKey:true });
});

router.post("/api/acc/signup", async ctx=>{
    const { username, password } = ctx.request.body;

    const tbl = await db("sys_accs");
    const passwordUnsafe = validatePassword(password);
    if (passwordUnsafe.length) { throw apiError(401, "password unsafe", { missing:passwordUnsafe }); }

    const usernameCount = (await tbl.rows.getChop("username").count(username));
    if (usernameCount) { throw apiError(401, "username taken"); }

    const hash = await bcrypt.hash(password, 10);
    const acc = await tbl.rows.addOrUpdate({username, password:hash});
    
    ctx.body = await tbl.cols.map(async c=>c.display > 0 ? acc(c) : null, { byKey:true });
});