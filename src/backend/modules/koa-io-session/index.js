import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";
import jet from "@randajan/jet-core";

import session from "koa-session";
import { SessionStore } from "./SessionStore";

const { virtual } = jet.prop;

const brgBySes = bridge.createGroup("bySession", socket=>socket.sessionId);

export const attachSession = (app, io, opt={})=>{
    if (!opt.key) { opt.key = jet.uid(12); }
    if (!opt.store) { opt.store = new SessionStore(); }

    if (!app.keys) { app.keys = Array(6).fill(1).map(_=>jet.uid(12)); }
    
    app.use(session(opt, app));
    app.use(async (ctx, next) => {
        ctx.session.active = true; //idk why but without this it doesnt work :)
        await next();
    });
    
    io.use(async (socket, next) => {
    
        if (!socket.handshake.headers.cookie) { return next(new Error('no cookie')); }
        
        const ctx = app.createContext(socket.request, socket.response);
        const sid = ctx.cookies.get(opt.key, opt);
        
        virtual(socket, "sessionId", _=>sid);
        virtual(socket, "session", _=>opt.store.get(sid));
        virtual(socket, "brothers", _=>brgBySes.get(sid).filter(s=>s !== socket));
    
        await next();
        
    });
};


export default attachSession;