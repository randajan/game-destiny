import React, { useEffect } from 'react';
import { useRoute } from "@randajan/jet-react/dom";

import "./Game.scss";

import { Button } from "@randajan/react-form";

import { game } from "../../game";
import { Lobby } from './Lobby/Lobby';
import { Briefing } from './Briefing/Briefing';
import { Desk } from './Desk/Desk';


const gamePhases = [
    <Lobby/>,
    <Briefing/>,
    <Desk/>
];


export const Game = (props)=>{
    const {} = props;

    const { params:{ gameId } } = useRoute();

    useEffect(_=>{
        game.connect(gameId);
        return _=>game.disconnect();
    }, [ gameId ]);

    const [ _phase ] = game.board.use("phase");
    const phaseId = _phase.get("id");
    
    return (
        <div className="Game" data-phase={phaseId}>
            { gamePhases[phaseId] }
            <div className="ctrls flex">
                <Button onSubmit={_=>_phase.set("id", 0)}>Config</Button>
                <Button onSubmit={_=>_phase.set("id", 1)}>Briefing</Button>
                <Button onSubmit={_=>_phase.set("id", 2)}>Game</Button>
            </div>
        </div>
    )
}

