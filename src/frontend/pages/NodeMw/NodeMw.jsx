import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import "./NodeMw.scss";
import { usePopOnPage } from '../../hooks/usePopOnPage';
import { game, useGame } from '../../config/game';
import { MatchCables } from '../../minigames/MatchCables/MatchCables';
import { CatchBall } from '../../minigames/CatchBall/CatchBall';

const _miniGames = [ MatchCables, CatchBall ];


export const NodeMw = (props)=>{
    const { id, title } = props;

    const seed = useGame("current.seed");
    const gid = id+":"+seed;

    const pass = {
        ...props,
        gid,
        onSubmit:async rate=>{
            const path = ["current.nodes", id];
            const data = await game.get(path);
            data.health = rate;
            data.isMw = false;
            await game.set(path, data);
        }
    }

    const MiniGame = Array.jet.getRND(_miniGames);
    
    return (
        <div className="NodeMw">
            <h3>{title}</h3>
            <p>Probíhá oprava...</p>
            <MiniGame {...pass}/>
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