import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";


import { Ticker } from "./Ticker";
import { GameBase } from "./GameBase";

const { solid, virtual } = jet.prop;

export class GameProvider extends Ticker {
    constructor(key, cfg={}) {
        const { onTick, onChange } = cfg;

        const _p = {};

        super({
            onInit:_=>{
                const base = _p.base = (new GameBase()).config(cfg);
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

        solid(this, "key", key);
        virtual(this, "base", _=>_p.base);

        this.setInterval(1000 * cfg.rates.refresh).start();
    }

}


