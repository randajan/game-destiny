import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { Ticker } from "./Ticker";
import { GameBoard } from "./GameBoard";
import { GameState } from "./GameState";
import { setRealLights } from "./Shelly";
import { channels } from "../../../../arc/routes";

const { solid, virtual } = jet.prop;

const _sockets = new Map();
const _games = {};


export class Game {

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

    static updateBoard(gameId, data) {
        return Game.find(gameId).board.update(data);
    }

    static updateState(gameId, data) {
        return Game.find(gameId).state.update(data);
    }

    constructor(id) {

        const _p = { }

        const onInit = _=>{ _p.state = (new GameState(this)); }

        const onTick = _=>{
            const board = this.board.get();
            const upd = board?.theme?.onTick(this);
            if (upd) { this.state.set("", upd); }
            this.emit(channels("game/updateState", true), this.state.get());
        }

        solid.all(this, {
            id,
            sockets:new Map(),
            board:new GameBoard(this),
            ticker:new Ticker({onInit, onTick})
        });
        
        virtual(this, "state", _=>_p.state);

        this.board.watch("", get => {
            this.emit(channels("game/updateBoard", true), get());
        });
        this.board.watch("phase.id", get=>{
            const id = get();
            if (id === 2) { this.ticker.start(); }
            else {
                this.ticker.stop().resetCounter();
                this.emit(channels("game/updateState", true), {});
                setRealLights(1);
            }
        });

        this.ticker.setInterval(200);
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
        return true;
    }

    disconnect(socket) {
        const clientId = this.sockets.get(socket);
        
        if (!clientId) { return false; } //socket is not part of this game
        this.sockets.delete(socket);
        _sockets.delete(socket);
        this.board.remove(["clients", clientId]);
        return true;
    }

}


