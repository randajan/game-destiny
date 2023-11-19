import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import { usePop, Block } from "@randajan/react-form";

import "./NodeMw.scss";

import { game } from '../../../../../game';
import { MatchCables } from './MatchCables/MatchCables';
import { CatchBall } from './CatchBall/CatchBall';
import { KillPop } from './KillPop/KillPop';
import { numFrame } from '../../../../../../arc/tools/formats';


const _miniGames = [ MatchCables, CatchBall ];
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

    const { id, isMw, isKill } = props;

    const killPop = usePop({lock:true});
    const mwPop = usePop({lock:true});

    const [ _seed ] = game.state.use("seed");
    const gid = id+":"+_seed.get();
    const path = ["nodes", id];

    useEffect(_=>{
        if (!isMw) { mwPop.down(); return; }
        mwPop.up(<NodeMw gid={gid} {...props} onSubmit={health=>{
            const v = game.state.get(path);
            v.health = numFrame(health);
            v.isMw = false;
            game.state.set(path, v);
        }}/>);
    }, [isMw]);

    useEffect(_=>{
        if (!isKill) { killPop.down(); return; }
        game.state.set([path, "isMw"], false);
        killPop.up(<KillPop onSubmit={_=>{ game.state.set([path, "isKill"], false); }}/>);
    }, [isKill]);

    return null;
}