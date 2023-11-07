import React from 'react';

import { Block } from "@randajan/react-form";

import { game } from "../../game";

import { ThemeSelect } from "./ThemeSelect/ThemeSelect";
import { ThemeNodes } from "./ThemeNodes/ThemeNodes";

import "./Lobby.scss";
import { Rates } from './Rates/Rates';



export const Lobby = (props)=>{
    const { clientId } = props;

    const [ board ] = game.board.use();
    
    return (
        <Block className="Lobby" caption={"Game room: "+board.get("id")}>
            <ThemeSelect/>
            <div className="clients">
                {jet.forEach(board.get("clients"), (v, k)=>{
                    return <div key={k} className={jet.melt(["client", k === clientId ? "local" : "remote"], " ")}>{k}</div>
                })}
            </div>
            <Rates/>
            <ThemeNodes/>
        </Block>
    )
}