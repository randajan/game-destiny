import React, { useEffect } from 'react';
import "./EndPop.scss";

import jet from "@randajan/jet-core";


import { Button } from '@randajan/react-form';
import { usePopOnPage } from "../../hooks/usePopOnPage";


export const EndPop = ({id, title, info, isWin, showRestart})=>{
    return (
        <div className={`EndPop ${id} ${isWin ? "win" : "loose"}`}>
            <h3>Konec hry</h3>
            <div className="endTitle">{title}</div>
            <div>{info}</div>
            {showRestart ? <Button onSubmit={_=>game.set("current.restart", true)}>Hrát znovu!</Button> : null}
        </div>
    );
}

export const usePopEnd = (props)=>{
    const pop = usePopOnPage({ lock:true });
    const { isEnd } = props;

    useEffect(_=>{
        if (!isEnd) { pop.down(); }
        else { pop.up(<EndPop {...props}/>); }
    }, [isEnd]);

    return pop;
}

export const EndPopUp = (props)=>{
    usePopEnd(props);
    return null;
}


