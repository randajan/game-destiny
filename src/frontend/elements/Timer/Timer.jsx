import React, { useEffect, useRef } from 'react';

import { intervalToDuration } from 'date-fns';

import "./Timer.scss";

export const Timer = (props)=>{
    const ref = useRef();

    useEffect(_=>{
        const start = new Date();
        const t = setInterval(_=>{
            const { seconds, minutes } = intervalToDuration({ start:start.getTime(), end:Date.now() });
            if (ref.current) { ref.current.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`; }
        }, 50);
        return _=>clearInterval(t);
    }, []);
    
    return <p className="Timer" ref={ref}/>
}

