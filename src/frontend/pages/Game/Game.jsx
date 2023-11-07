import React, { useEffect } from 'react';

import "./Game.scss";


import { game } from "../../game";
import { store, page } from '../../config/bases';
import { Lobby } from '../../frames/Lobby/Lobby';





export const Game = (props)=>{
    const {} = props;

    const [ client ] = store.use("client");
    const clientId = client.get("id");

    useEffect(_=>{ game.connect(page.pull("search.id"), clientId); }, [clientId]);
    
    return (
        <div className="Game">
            <Lobby clientId={clientId}/>
        </div>
    )
}

