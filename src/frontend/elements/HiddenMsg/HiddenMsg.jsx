import React, { useState } from 'react';

import jet from "@randajan/jet-core";

import "./HiddenMsg.scss";
import { useHideout } from '../../hooks/useHideout';



export const HiddenMsg = props=>{
    const { className, value, pattern, length } = props;
    const [ hide ] = useState(String.jet.hide(".".repeat(length) || value, pattern));
    const [ ref, state ] = useHideout();

    return (
        <div ref={ref} className={jet.melt(["HiddenMsg", className], " ")} data-flags={state ? "visible" : "hidden"}>
            <p className="msg">{value}</p>
            <p className="cover">{hide}</p>
        </div>
    )
}

