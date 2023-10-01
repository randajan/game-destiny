import jet from "@randajan/jet-core";
import { Ship } from "./Ship";
import { nodes } from "../nodes";

const { solid, virtual } = jet.prop;

export class Game {
    constructor(cfg={}) {

        const tickRate = Number.jet.frame(cfg.tickRate, 100, 60000);
        const onTick = jet.isRunnable(cfg.onTick) ? cfg.onTick : _=>{};

        const _p = {
            status:false,
            tick:0,
            tickRate
        };

        const tick = _=>{
            if (!_p.status) { return; }
            _p.tick ++;
            _p.ship.onTick();
            onTick(this);
            setTimeout(tick, tickRate);
        }

        const stop = _=>{
            if (!_p.status) { return false; }
            _p.status = false;
            clearTimeout(_p.int);
            return true;
        }

        const start = _=>{
            if (_p.status) { return false; }
            _p.status = true;
            tick();
            return true;
        }

        const reset = _=>{
            stop();
            _p.ship = new Ship(this, nodes);
            return true;
        }

        solid.all(this, {
            start,
            stop,
            reset
        }, false);

        virtual.all(this, {
            status:_=>_p.status,
            tick:_=>_p.tick,
            ship:_=>_p.ship
        });

        reset();
    }


}