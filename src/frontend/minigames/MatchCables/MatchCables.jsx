import React, { useState } from 'react';

import { Button } from "@randajan/react-form";
import { useDrag } from "@randajan/jet-react";

import "./MatchCables.scss";
import { useGame } from '../../config/game';

const _rnds = {};

const _colors = ["red", "green", "blue", "magenta"];
const _cableCount = 4;

const SocketAndCable = props=>{
    const { cableId, socketId, length, onStop } = props;

    const socketX = Number.jet.snap(((socketId + 1) / length)*.8, .05, 0.1, .9);
    const cableX = Number.jet.snap(((cableId + 1) / length)*.8, .05, 0.1, .9);

    const [ ref, move ] = useDrag((bound)=>{
        bound.relX = Number.jet.snap(bound.relX, .05, 0.1, .9);
        bound.relY = Number.jet.snap(bound.relY, .05, 0.2, .8);
        if (bound.state !== "stop") { return; }
        onStop(bound.relY === .8 && socketX === bound.relX);
    }, {
        initX:cableX,
        initY:0.2,
        appendState:true
    });

    const style = {
        width:(60/length) + "%",
        height:(60/length)*2 + "%"
    }

    return (
        <>
            <div className={"socket socket"+socketId} style={{
                ...style,
                top:"80%",
                left:(socketX*100)+"%"

            }} >{socketId}</div>
            <div className={"cable cable"+cableId} style={{
                ...style,
                backgroundColor:_colors[cableId]
            }} ref={ref}>{Number.jet.toLetter(cableId)}</div>
        </>
    )
}

export const MatchCables = (props)=>{
    const { id, onSubmit } = props;

    const seed = useGame("current.seed");
    const [result] = useState(_=>[]);

    const gid = id+":"+seed;
    const rnds = _rnds[gid] || (_rnds[gid] = Array.jet.shuffle(Array(_cableCount).fill(1).map((_, id)=>id)));

    const onSelfSubmit = _=>{
        const correct = result.reduce((r, v)=>r + v, 0);
        console.log(correct / _cableCount);
        onSubmit(correct / _cableCount);
    }

    return (
        <div className="MatchCables">
            <div className="field">
                {rnds.map((cableId, socketId)=>{
                    return <SocketAndCable key={socketId} {...{
                        cableId, socketId, length:rnds.length,
                        onStop:ok=>result[socketId] = ok
                    }}/>
                })}
            </div>
            <Button onSubmit={onSelfSubmit}>Opraveno</Button>
        </div>
    )
}

