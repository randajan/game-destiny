import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { Ticker } from "../../../../arc/class/Ticker";
import { gameConfig } from "../config";
import { BaseSync } from "@randajan/jet-base";
import { GameBoard } from "./GameBoard";

const { solid, virtual } = jet.prop;

const _ids = [];
const _games = {};
const _idsCache = {};

const createId = _=>{
    while (true) {
        const id = String.jet.rnd(6, 6) + Math.round(Number.jet.rnd(10, 100));
        if (!_ids.includes(id)) { return id; }
    }
}

const getId = (role, browserId)=>{
    if (!role || !browserId) { return createId(); }
    const id = role + ":" + browserId;
    return _idsCache[id] || ( _idsCache[id] = createId() );
}

export class Game extends Ticker {

    static find(gameId, undefinedError=true, missingError=true) {
        if (_games[gameId]) { return _games[gameId]; }
        if (!gameId && undefinedError) { throw Error(`Game not found id is undefined`); }
        if (gameId && missingError) { throw Error(`Game not found id '${gameId}'`); }
    }

    static connect(socket, gameId, browserId) {
        return (Game.find(gameId, false) || new Game(browserId)).join(socket, browserId);
    }

    constructor(browserId) {
        const id = getId("game", browserId);

        let current;

        super({
            onInit:_=>{
                // const base = _p.base = (new GameBase()).config({ cfg, ticker:this });
                // base.watch("solid.rates.refresh", async _=>this.setInterval(1000 * await base.get("solid.rates.refresh")));
                // base.watch("current", async _=>be.io.emit("game-tick", JSON.stringify(await base.get("current"))));
                // base.watch("", async get=>onChange(await get(""), this));
            },
            onTick:async _=>{
                // const { base } = _p;
                // const game = await base.get();
                // const gameUpdate = await onTick(game, this);
                // if (!gameUpdate || base !== _p.base) { return; }
                // await base.set("", gameUpdate);
            }
        });

        solid.all(this, {
            id,
            sockets:new Map(),
            board:new GameBoard(this)
        });
        
        virtual(this, "current", _=>current);

        //this.setInterval(1000 * cfg.rates.refresh).start();
        _games[id] = this;
    }

    emit(event, data) {
        this.sockets.forEach((id, socket)=>{ socket.emit(event, data); });
    }

    join(socket, browserId) {
        const id = getId("client", browserId);

        this.sockets.set(socket, id);
        this.board.set(["clients", id], { id });

        socket.on("disconnect", _=>{
            this.sockets.delete(socket);
            this.board.remove(["clients", id]);
        });

        return id;
    }

}


