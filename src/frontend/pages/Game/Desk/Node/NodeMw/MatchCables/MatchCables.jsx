import React, { useState } from 'react';

import { Bar, Button } from "@randajan/react-form";
import { useDrag, useForceRender } from "@randajan/jet-react";

import "./MatchCables.scss";
import { colors } from '../../../../../../config/const';

const _cfgs = {};
const _cableCount = 4;

const getConfig = (gid, cableCount, onSubmit)=>{
    if (_cfgs[gid]) { return _cfgs[gid]; }
    const rnds = Array.jet.shuffle(Array(cableCount).fill(1).map((_, id)=>id));

    const cableY = .2;
    const socketY = .8;
    const sockets = [];

    const list = rnds.map((cableId, socketId)=>{
        const cableX = Number.jet.round(Number.jet.snap(((cableId + 1) / cableCount)*.8, .025, 0.1, .9), 4)
        const socketX = Number.jet.round(Number.jet.snap(((socketId + 1) / cableCount)*.8, .025, 0.1, .9), 4);
        sockets.push(socketX);

        return {
            cableId,
            socketId,
            cableX,
            cableY,
            socketX,
            socketY,
            currentCableX:cableX,
            currentCableY:cableY
        }
    });

    const onStop = _=>{
        const connectTo = new Set();
        let correct = 0;

        for (const { socketY, socketX, currentCableY, currentCableX } of list) {
            if (socketY !== currentCableY) { continue; }
            else if (socketX === currentCableX) { correct++; connectTo.add(currentCableX); }
            else if (sockets.includes(currentCableX)) { connectTo.add(currentCableX); }
        }

        _cfgs[gid].status = connectTo.size === cableCount ? correct / cableCount : 0;

        //console.log("stop", _cfgs[gid].status, connectTo.size, correct);
    }

    const submit = _=>{
        onSubmit(_cfgs[gid].status);

        for (const c of list) {
            c.currentCableX = c.cableX;
            c.currentCableY = c.cableY;
        }

        _cfgs[gid].status = 0;
    }

    return _cfgs[gid] = {
        snapX:relX=>Number.jet.round(Number.jet.snap(relX, .025, 0.1, .9), 4),
        snapY:relY=>Number.jet.round(Number.jet.snap(relY, .025, 0.2, .8), 4),
        size:.6 / cableCount,
        list,
        status:0,
        onStop,
        submit
    }
}



const useConfig = (gid, cableCount, onSubmit)=>getConfig(gid, cableCount, onSubmit);

const SocketAndCable = props=>{
    const { id, list, cableId, socketId, cableY, cableX, socketX, snapX, snapY, size, onStop, refreshBar } = props;

    const [ ref, move ] = useDrag((bound)=>{
        bound.relX = snapX(bound.relX);
        bound.relY = snapY(bound.relY);
        if (bound.state !== "stop") { return; }
        list[id].currentCableY = Number.jet.round(bound.relY, 4);
        list[id].currentCableX = Number.jet.round(bound.relX, 4);
        onStop(list[id]);
        refreshBar();
    }, {
        initX:cableX,
        initY:cableY,
        appendState:true
    });

    const style = { width:(100*size) + "%", height:(2*100*size) + "%" }

    return (
        <>
            <div className={"socket socket"+socketId} style={{
                ...style,
                top:"80%",
                left:(socketX*100)+"%"

            }} >{socketId}</div>
            <div className={"cable cable"+cableId} style={{
                ...style,
                backgroundColor:colors[cableId]
            }} ref={ref}>{Number.jet.toLetter(cableId)}</div>
        </>
    )
}



export const MatchCables = (props)=>{
    const cableCount = _cableCount;

    const { gid, onSubmit } = props;

    const config = useConfig(gid, cableCount, onSubmit);
    const refresh = useForceRender();

    return (
        <div className="MatchCables">
            <Bar value={config.status} from={0} to={1}>{config.status * 100}%</Bar>
            <div className="field">
                {config.list.map((props, id)=>{
                    return <SocketAndCable key={id} id={id} {...config} {...props} refreshBar={refresh}/>
                })}
            </div>
            <Button onSubmit={config.submit}>Dokončit</Button>
        </div>
    )
}

