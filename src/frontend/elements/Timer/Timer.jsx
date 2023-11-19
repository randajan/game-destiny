import React, { useEffect, useRef, useState } from 'react';

import { intervalToDuration } from 'date-fns';

import "./Timer.scss";

export const Timer = (props)=>{
    const { stop } = props;
    const [ ms ] = useState({current:0});
    const ref = useRef();

    useEffect(_=>{
        if (stop) { return; }
        let from = Date.now();
        const t = setInterval(_=>{
            const to = Date.now();
            ms.current += (to - from);
            from = to;
            const { seconds, minutes } = intervalToDuration({ start:0, end:ms.current });
            if (ref.current) { ref.current.innerText = `${String(minutes)}:${String(seconds).padStart(2, "0")}`; }
        }, 50);
        return _=>clearInterval(t);
    }, [stop, ms]);
    
    return <p className="Timer" ref={ref}>0:00</p>
}

