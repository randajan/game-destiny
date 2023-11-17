import fe, { bridge, info } from "@randajan/simple-app/fe";

import jet from "@randajan/jet-react";
import { emit } from "../../config/io";
import { GameBoard } from "./GameBoard";

import { store } from "../../config/bases";
import { GameState } from "./GameState";

const { solid, virtual } = jet.prop;


export class Game {

    constructor() {

        const _p = { isConnected:false };
        
        solid.all(this, {
            board:new GameBoard(this),
            state:new GameState(this)
        });

        const disconnect = async _=>{
            if (!_p.isConnected) { false; }
            _p.isConnected = false;
            const done = await this.emit("gameDisconnect");
            _p.isConnected = !done;
            if (done) { this.board.remove(); }
            return done;
        }

        const connect = async gameId=>{
            _p.isConnected = true;
            const done = await this.emit("gameConnect", { gameId, client:store.get("client") });
            _p.isConnected = done;
            if (!done) { this.board.remove(); }
            return done;
        };

        solid.all(this, {
            connect,
            disconnect
        }, false);

        virtual.all(this, {
            id:_=>this.board.get("id"),
            isConnected:_=>_p.isConnected
        });

    }

    async emit(event, data={}) {
        return emit(event, data);
    }

}