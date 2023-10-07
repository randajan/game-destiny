import React, { useEffect, useState } from 'react';
import jet from "@randajan/jet-core";



import { useRoute } from "@randajan/jet-react/dom";
import { game, useGame } from '../../config/game';

import { Switch, Range, Button } from '@randajan/react-form';

import { E404 } from "../E404/E404";
import { usePop } from '@randajan/react-popup';

import "./Node.scss";
import { ShipNode } from '../../elements/ShipNode/ShipNode';
import { ShipStat } from '../../elements/ShipStat/ShipStat';
import { EndPopUp } from '../../elements/EndPop/EndPop';
import { usePopPause } from '../../hooks/usePopPause';
import { NodeMwPopUp } from '../NodeMw/NodeMw';


export const Node = (props)=>{
    const { params:{ id } } = useRoute();
    const data = useGame();

    usePopPause(data?.current?.pause, "Dostavte se prosím neprodleně na můstek");

    if (!data) { return null; }

    const { solid:{ states, stats, nodes }, current } = data;
    const currentState = states[current.state];

    if (!nodes[id]) { return <E404/>; }

    const { stat, title, info,  } = nodes[id];

    return (
        <div className="Node block">
            <EndPopUp {...currentState}/>
            <NodeMwPopUp {...nodes[id]} {...current.nodes[id]}/>
            <h2>{title}</h2>
            <div className="nodeStats">
                <ShipStat { ...stats.energy } { ...current.stats.energy }/>
                {stat ? <ShipStat { ...stats[stat] } { ...current.stats[stat] }/> : null}
            </div>
            <div className="nodeMw">
                <Button onSubmit={_=>{ game.set(["current.nodes", id, "isMw"], true); }}>Opravit</Button>
            </div>
            <div className="nodeControl">
                <ShipNode showInfo {...nodes[id]} { ...current.nodes[id] }/>
            </div>
            <div className="nodeInfo">{info}</div>
        </div>
    )
}

