import React from 'react';

import "./Game.scss";

import { usePromise } from '@randajan/jet-react';
import { useRoute } from "@randajan/jet-react/dom";

import { game } from "../../game";
import { localStore } from '../../config/localStore';

localStore.accept();
localStore.setDefault("browser.id", jet.uid(32));

export const Game = (props)=>{
    const {} = props;
    const { params:{ gameId } } = useRoute();

    const [ clientId ] = usePromise("", _=>game.connect(gameId, localStore.get("browser.id")), [gameId]);
    const [ board ] = game.board.use();
    
    return (
        <div className="Game">
            <h2>Game room: {board.get("id")}</h2>
            <div className="clients">
                {jet.forEach(board.get("clients"), (v, k)=>{
                    return <div key={k} className={jet.melt(["client", k === clientId ? "local" : "remote"], " ")}>{k}</div>
                })}
            </div>
            
        </div>
    )
}

