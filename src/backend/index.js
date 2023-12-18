import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";
import jet from "@randajan/jet-core";


import serve from "koa-static";
import send from 'koa-send';

import router, { ApiError } from "./router";
import "./io";
import "./controllers/**"; //setup all routes/controllers

import attachSession from "./modules/koa-io-session";

attachSession(app, io);

app.use(async (ctx, next) => {
    let err;
    try { await next(); } catch (e) { err = e; }

    if (!err) { return; }
    if (err instanceof ApiError) {
        const { status, message, details } = err;
        ctx.status = status;
        return ctx.body = { error: { message, details } }
    }

    throw err;
});

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) { await send(ctx, info.dir.fe + "/index.html"); }
});

app.use(serve(info.dir.fe));

app.use(router.routes());

