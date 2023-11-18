import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import { usePop, Block } from "@randajan/react-form";

import "./NodeMw.scss";

import { game } from '../../../../../game';
import { MatchCables } from './MatchCables/MatchCables';
import { CatchBall } from './CatchBall/CatchBall';


const _miniGames = [ CatchBall ];
const _rnds = {};

export const NodeMw = (props)=>{

    const { title, gid } = props;

    const MiniGame = _rnds[gid] || (_rnds[gid] = Array.jet.getRND(_miniGames));
    
    return (
        <Block className="NodeMw" caption={title}>
            <p>Probíhá oprava...</p>
            <MiniGame {...props}/>
        </Block>
    )
}

export const NodeMwPopUp = props=>{

    const { id, isMw } = props;

    const pop = usePop({lock:true});

    const [ _seed ] = game.state.use("seed");
    const gid = id+":"+_seed.get();

    const onSubmit = health=>{
        const path = ["nodes", id];
        game.state.set(path, jet.merge(game.state.get(path), { health, isMw:false }));
    }

    useEffect(_=>{
        if (!isMw) { pop.down(); }
        else { pop.up(<NodeMw gid={gid} {...props} onSubmit={onSubmit}/>); }
    }, [isMw, onSubmit]);

    return null;
}