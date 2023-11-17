import React from 'react';


import "./Desk.scss";
import { store } from '../../../config/bases';
import { Monitor } from './Monitor/Monitor';
import { Node } from './Node/Node';
import { Stage } from "./Stage/Stage";

import { PauseButton } from '../../../elements/PauseButton/PauseButton';
import { EndPopUp } from '../../../elements/EndPop/EndPop';

export const Desk = (props)=>{
    const {} = props;

    const [ _clientId ] = store.use("client.id");
    const clientId = _clientId.get();

    const [ _nodes ] = game.board.use("theme.nodes");
    const clientNode = _nodes.get().find(n=>n.client === clientId);


    return (
        <div className="Desk">
            {!clientNode ? null : clientNode.id === "main" ? <Monitor/> : <Node {...clientNode}/>}
        </div>
    )

}

