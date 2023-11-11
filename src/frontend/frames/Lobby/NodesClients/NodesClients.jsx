import React from 'react';

import "./NodesClients.scss";
import { Block, Caption, usePop } from '@randajan/react-form';
import { game } from '../../../game';
import { store } from '../../../config/bases';

const NodeClient = props=>{
    
    const [ client ] = store.use("client");
    const clientId = client.get("id");

    return (
        <div {...props} className={jet.melt(["Client", ], " ")}>

        </div>
    )
}


export const NodesClients = (props)=>{

    const pairPop = usePop();

    // const [ theme ] = game.board.use("themeId");
    // const [ clients ] = game.board.use("clients");
    const [ _nodes ] = game.board.use("nodes");

    // const themeId = theme.get("id");
    const nodes = _nodes.get();

    // const nodesClients = {};
    // const unsgnClients = jet.forEach(clients.get(), (v, key)=>{
    //     const nodeId = (v?.game?.themes || {})[themeId]?.nodeId;
    //     if (!nodeId || nodesClients[nodeId]) { return v; }
    //     nodesClients[nodeId] = v.name;
    // });
    
    return (
        <Block className="NodesClients" caption="Palubní systémy">
            <div className="flex">
                {/* {nodes?.map((v, key)=>(
                    <Block key={key} className="node" caption={v.title}>
                        <div className="slot">{nodesClients[v.id] || "select"}</div>
                    </Block>
                ))} */}
            </div>
        </Block>
    )
}



