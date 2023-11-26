import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";
import jet from "@randajan/jet-core";

import session from "koa-session";

const { solid, virtual } = jet.prop;

class SessionStore {
    constructor() {
        this._recs = new Map();
    }

    has(sid) {
        return this._recs.has(sid);
    }

    get(sid) {
        const rec = this._recs.get(sid);
        if (!rec) { return; }
        rec.session;
        if (Date.now() > rec.expiresAt) { return this.destroy(sid); }
        return rec.session;
    }

    set(sid, session, maxAge) {
        const expiresAt = Date.now() + maxAge;
        this._recs.set(sid, { session, expiresAt, maxAge });
    }

    destroy(sid) {
        this._recs.delete(sid);
    }
};

const opt = {
    key:jet.uid(12),
    store:new SessionStore()
}

app.keys = Array(6).fill(1).map(_=>jet.uid(12));

app.use(session(opt, app));
app.use(async (ctx, next) => {
    ctx.session.sockets = new Set(); //IDK why this is neccessary don't remove it!!!
    await next();
});

io.use(async (socket, next) => {

    if (!socket.handshake.headers.cookie) { return next(new Error('no cookie')); }
    
    const ctx = app.createContext(socket.request, socket.response);
    const sid = ctx.cookies.get(opt.key, opt);
    
    virtual(socket, "session", _=>opt.store.get(sid));
    
    if (opt.store.has(sid)) {
        const { sockets } = socket.session;
        sockets.add(socket);
        socket.on("disconnect", _=>{ sockets.delete(socket); });
    }


    await next();
    
});