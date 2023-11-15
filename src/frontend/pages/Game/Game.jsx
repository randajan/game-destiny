import React, { useEffect } from 'react';
import { useRoute } from "@randajan/jet-react/dom";

import "./Game.scss";


import { game } from "../../game";
import { Lobby } from './Lobby/Lobby';
import { Briefing } from './Briefing/Briefing';


const gamePhases = [
    <Lobby/>,
    <Briefing/>,
    <div>DIS FUCKING GAME</div>
];


export const Game = (props)=>{
    const {} = props;

    const { params:{ gameId } } = useRoute();

    useEffect(_=>{
        game.connect(gameId);
        return _=>game.disconnect();
    }, [ gameId ]);

    const [ _phase ] = game.board.use("phase");
    
    return (
        <div className="Game">
            {
                gamePhases[_phase.get()]
            }
        </div>
    )
}

