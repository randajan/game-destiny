import React, { useEffect } from 'react';
import { useRoute } from "@randajan/jet-react/dom";

import "./Game.scss";


import { game } from "../../game";
import { Lobby } from '../../frames/Lobby/Lobby';





export const Game = (props)=>{
    const {} = props;

    const { params:{ gameId } } = useRoute();

    useEffect(_=>{
        game.connect(gameId);
        return _=>game.disconnect();
    }, [ gameId ]);
    
    return (
        <div className="Game">
            <Lobby/>
        </div>
    )
}

