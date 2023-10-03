import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";


import { Ticker } from "./Ticker";
import { GameBase } from "./GameBase";

const { solid, virtual } = jet.prop;

export class GameProvider extends Ticker {
    constructor(key, cfg={}) {
        const { onTick } = cfg;

        const _p = {};

        super({
            onInit:_=>{
                const base = _p.base = (new GameBase()).config(cfg);
                base.watch("rates.refresh", async _=>this.interval = (1000 * await base.get("rates.refresh")));
            },
            onTick:async _=>{
                const { base } = _p;
                const gameData = await base.get();
                if (!gameData.pause) { 
                    const gameUpdate = await onTick(gameData, this);
                    if (!gameUpdate || base !== _p.base) { return; }
                    await base.set("", gameUpdate);
                }
                be.io.emit("game-tick", JSON.stringify(await base.get()));
            }
        });

        solid(this, "key", key);
        virtual(this, "base", _=>_p.base);

        this.setInterval(1000 * cfg.rates.refresh).start();
    }

}


