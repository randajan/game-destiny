import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { Ticker } from "../../../../arc/class/Ticker";
import { GameBoard } from "./GameBoard";

const { solid, virtual } = jet.prop;

const _sockets = new Map();
const _games = {};


export class Game extends Ticker {

    static find(gameId, undefinedError=true, missingError=true) {
        if (_games[gameId]) { return _games[gameId]; }
        if (!gameId && undefinedError) { throw Error(`Game not found id is undefined`); }
        if (gameId && missingError) { throw Error(`Game not found id '${gameId}'`); }
    }

    static connect(socket, gameId, client) {
        if (!client?.id) { throw Error(`Game connect client id is undefined`); }
        return (Game.find(gameId, false, false) || new Game(gameId)).connect(socket, client);
    }

    static disconnect(socket) {
        const game = _sockets.get(socket);
        if (game) { return game.disconnect(socket); }
    }

    static updateBoard(data) {
        return Game.find(data?.id).board.update(data);
    }

    constructor(id) {
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

    connect(socket, client) {
        Game.disconnect(socket);
        this.sockets.set(socket, client.id);
        _sockets.set(socket, this);
        this.board.set(["clients", client?.id], client);
        console.log("connect", this.id, client);
        return true;
    }

    disconnect(socket) {
        const clientId = this.sockets.get(socket);
        
        if (!clientId) { return false; } //socket is not part of this game
        this.sockets.delete(socket);
        _sockets.delete(socket);
        this.board.remove(["clients", clientId]);
        console.log("disconnect", this.id, clientId);
        return true;
    }

}


