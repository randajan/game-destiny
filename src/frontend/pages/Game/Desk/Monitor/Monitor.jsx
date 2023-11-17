import React from 'react';

import { Block } from "@randajan/react-form";

import "./Monitor.scss";

import { StatBar } from '../StatBar/StatBar';
import { NodeMonitor } from './NodeMonitor/NodeMonitor';
import { Stage } from '../Stage/Stage';

export const Monitor = (props) => {

    const [ _stats ] = game.board.use("theme.stats");
    const [ _nodes ] = game.board.use("theme.nodes");

    const stats = _stats.get();
    const nodes = _nodes.get();
    
    return (
        <Block className="Monitor" caption={"Monitor"}>
            <Stage/>
            <div className="stats">
                {stats?.map((stat, key) => <StatBar key={key} {...stat}/>)}
            </div>
            <div className="nodes">
                {nodes?.map((node, key) =>{
                    if (node?.id === "main") { return null; }
                    return <NodeMonitor key={key} {...node}/>
                })}
            </div>
        </Block>
    )
}


