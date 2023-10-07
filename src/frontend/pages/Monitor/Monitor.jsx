import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import { usePop } from "@randajan/react-popup";


import "./Monitor.scss";

import { useGame } from '../../config/game';

import { PauseButton } from '../../elements/PauseButton/PauseButton';
import { ShipNode } from '../../elements/ShipNode/ShipNode';
import { ShipStat } from '../../elements/ShipStat/ShipStat';
import { EndPopUp } from '../../elements/EndPop/EndPop';


export const Monitor = (props) => {
    const data = useGame();

    if (!data) { return null; }

    const { solid:{ states, stats, nodes }, current } = data;
    const currentState = states[current.state];

    return (
        <div className="Monitor">
            <EndPopUp showRestart {...currentState}/>
            <div className="heading">
                <p/>
                <h2 title={currentState.info}>Stav lodi : {currentState.title}</h2>
                <p><PauseButton pause={current.pause}/></p>
            </div>
            <div className="stats">
                {jet.forEach(stats, (stat, id) => <ShipStat key={id} {...stat} {...current.stats[id]} />)}
            </div>
            <div className="nodes">
                {jet.forEach(nodes, (node, id) => <ShipNode key={id} {...node} {...current.nodes[id]} withTitle/>)}
            </div>
        </div>
    )
}


