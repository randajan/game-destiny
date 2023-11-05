import React, { useEffect } from 'react';

import "./Game.scss";


import { game } from "../../game";
import { store, page } from '../../config/bases';

import { ThemeSelect } from "../../frames/ThemeSelect/ThemeSelect";



export const Game = (props)=>{
    const {} = props;

    const [ board ] = game.board.use();
    const [ client ] = store.use("client");
    const clientId = client.get("id");

    useEffect(_=>{ game.connect(page.pull("search.id"), clientId); }, [clientId]);
    
    return (
        <div className="Game">
            <h2>Game room: {board.get("id")}</h2>
            <ThemeSelect/>
            <div className="clients">
                {jet.forEach(board.get("clients"), (v, k)=>{
                    return <div key={k} className={jet.melt(["client", k === clientId ? "local" : "remote"], " ")}>{k}</div>
                })}
            </div>
            
        </div>
    )
}

