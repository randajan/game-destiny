import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import "./NodeMw.scss";
import { usePopOnPage } from '../../../../../hooks/usePopOnPage';
import { game } from '../../../../../game';
import { MatchCables } from './MatchCables/MatchCables';
import { CatchBall } from './CatchBall/CatchBall';



const _miniGames = [ MatchCables, CatchBall ];
const _rnds = {};

export const NodeMw = (props)=>{
    const { title, gid } = props;

    const MiniGame = _rnds[gid] || (_rnds[gid] = Array.jet.getRND(_miniGames));
    
    return (
        <div className="NodeMw">
            <h3>{title}</h3>
            <p>Probíhá oprava...</p>
            <MiniGame {...props}/>
        </div>
    )
}

export const NodeMwPopUp = props=>{

    return null;
    const { id, isMw } = props;

    const seed = useGame("current.seed");
    
    const gid = id+":"+seed;

    const onSubmit = async rate=>{
        const path = ["current.nodes", id];
        const data = await game.get(path);
        if (rate != null) { data.health = rate; }
        data.isMw = false;
        await game.set(path, data);
    }

    const pop = usePopOnPage({lock:true});

    useEffect(_=>pop.onDown.add(_=>onSubmit()), [pop, onSubmit]);

    useEffect(_=>{
        if (!isMw) { pop.down(); }
        else { pop.up(<NodeMw gid={gid} {...props} onSubmit={onSubmit}/>); }
    }, [isMw]);

    return null;
}