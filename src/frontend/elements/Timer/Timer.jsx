import React, { useEffect, useRef } from 'react';

import { intervalToDuration } from 'date-fns';

import "./Timer.scss";

export const Timer = (props)=>{
    const { stop } = props;
    
    const ref = useRef();

    useEffect(_=>{
        if (stop) { return; }
        const start = new Date();
        const t = setInterval(_=>{
            const { seconds, minutes } = intervalToDuration({ start:start.getTime(), end:Date.now() });
            if (ref.current) { ref.current.innerText = `${String(minutes)}:${String(seconds).padStart(2, "0")}`; }
        }, 50);
        return _=>clearInterval(t);
    }, [stop]);
    
    return <p className="Timer" ref={ref}>0:00</p>
}

