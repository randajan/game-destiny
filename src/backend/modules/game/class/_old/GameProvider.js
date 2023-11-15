import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { Ticker } from "../../../../../arc/class/Ticker";
import { GameBase } from "./GameBase";
import { gameConfig } from "../config";

const { solid, virtual } = jet.prop;

const _ids = [];
const _games = {};

const createId = _=>{
    while (true) {
        const id = String.jet.rnd(6, 6) + Math.round(Number.jet.rnd(10, 100));
        if (!_ids.includes(id)) { return id; }
    }
}

export class Game extends Ticker {

    static create(socket) {
        const game = (new Game(gameConfig));
        _games[game.id] = game;
        return game.join(socket);
    }

    static join(gid, socket) {
        const game = _games[gid];
        if (game) { return game.join(socket); }
    }

    constructor(cfg={}) {
        const id = createId();

        const { onTick, onChange } = gameConfig;

        const _p = {};

        super({
            onInit:_=>{
                const base = _p.base = (new GameBase()).config({ cfg, ticker:this });
                base.watch("solid.rates.refresh", async _=>this.setInterval(1000 * await base.get("solid.rates.refresh")));
                base.watch("current", async _=>be.io.emit("game-tick", JSON.stringify(await base.get("current"))));
                base.watch("", async get=>onChange(await get(""), this));
            },
            onTick:async _=>{
                const { base } = _p;
                const game = await base.get();
                const gameUpdate = await onTick(game, this);
                if (!gameUpdate || base !== _p.base) { return; }
                await base.set("", gameUpdate);
            }
        });

        solid(this, "id", id);
        solid(this, "sockets", {});
        virtual(this, "base", _=>_p.base);

        this.setInterval(1000 * cfg.rates.refresh).start();

    }

    join(socket) {
        const id = createId();
        this.sockets[id] = socket;
        return id;
    }

}


