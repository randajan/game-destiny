import React, { useEffect, useRef, useState } from 'react';

import jet from "@randajan/jet-core";

import { Bar, Button } from "@randajan/react-form";
import { useDrag } from "@randajan/jet-react";
import "./CatchBall.scss";
import { colors } from '../../../../../../config/const';

const _max = 20;

const setTrigger = (callback, msMin, msMax, msSqr)=>{
    let int, cnt = 0;

    const stop = _=>{ clearTimeout(int); }
    const tick = _=>{ callback(plan, cnt++); }
    const plan = _=>{
        stop();
        int = setTimeout(tick, Number.jet.rnd(msMin, msMax, msSqr));
    }

    plan();
    return { tick, stop };
}

export const CatchBall = (props)=>{
    const { gid, onSubmit } = props;
    const [ status, setStatus ] = useState(0);

    const ref = useRef();

    useEffect(_=>{
        let result = 0, status = 0;

        const confirm = (plan, tid)=>{
            const el = ref.current;
            const state = tid%2;
            if (!el) { return }
            el.setAttribute("data-state", state ? "on" : "off");
            setTimeout(_=>{
                if (tid == _max * 2) { onSubmit(status); }
                if (state) {
                    el.style.top = Number.jet.rnd(20, 80) + "%";
                    el.style.left = Number.jet.rnd(10, 90) + "%";

                    el.style["backgroundColor"] = Array.jet.getRND(colors);
                }
                plan();
            }, state ? 0 : 200);
    
        }

        const trigger = setTrigger(confirm, 650, 800, 3);
        const deaf = Element.jet.listen(ref.current, "click", _=>{
            result ++;
            setStatus(status = Number.jet.round(Number.jet.toRatio(result, 0, _max), 4));
            trigger.tick();
        });

        return _=>jet.run([trigger.stop, deaf]);
    }, []);


    return (
        <div className="CatchBall">
            <Bar value={status} from={0} to={1}>{(status * 100).toFixed(0)}%</Bar>
            <div className="field">
                <div ref={ref} className="ball" data-state={"off"}></div>
            </div>
        </div>
    )
}

