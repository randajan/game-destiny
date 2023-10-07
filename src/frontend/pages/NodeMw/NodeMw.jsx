import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import "./NodeMw.scss";
import { usePopOnPage } from '../../hooks/usePopOnPage';
import { game } from '../../config/game';
import { MatchCables } from '../../minigames/MatchCables/MatchCables';


export const NodeMw = (props)=>{
    const { id, title } = props;
    
    return (
        <div className="NodeMw">
            <h3>{title}</h3>
            <p>Probíhá oprava...</p>
            <MatchCables {...props} onSubmit={async rate=>{
                const path = ["current.nodes", id];
                const data = await game.get(path);
                data.health = rate;
                data.isMw = false;
                await game.set(path, data);
            }}/>
        </div>
    )
}

export const NodeMwPopUp = props=>{
    const pop = usePopOnPage({ lock:true });

    const { isMw } = props;

    useEffect(_=>{
        if (!isMw) { pop.down(); }
        else { pop.up(<NodeMw {...props}/>); }
    }, [isMw]);

    return null;
}