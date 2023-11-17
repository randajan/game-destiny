import React, { useState } from 'react';

import { Block, Caption, Button, Field, Menu, Pane, usePop } from "@randajan/react-form";

import { game } from "../../../game";
import { store } from '../../../config/bases';

import { Rates } from './Rates/Rates';

import { ThemeSelect } from "./ThemeSelect/ThemeSelect";


import "./Lobby.scss";
import { Lights } from './Lights/Lights';
import { Crews } from './Crews/Crews';
import { ThemeNodes } from './ThemeNodes/ThemeNodes';
import { Mods } from './Mods/Mods';


const panels = [
    { caption:"Modifiers", Content:Mods },
    { caption:"Rates", Content:Rates },
    { caption:"Nodes", Content:ThemeNodes },
    { caption:"Crew members", Content:Crews },
    { caption:"Lights", Content:Lights },
]

export const Lobby = (props)=>{
    const [ panel, setPanel ] = useState(0);

    const [ boardId ] = game.board.use("id");
    const [ _clientName ] = store.use("client.name");
    const clientName = _clientName.get();
    
    return (
        <Block className="Lobby">
            <div className="header">
                <Caption>{"Game room: "+boardId.get()}</Caption>
                <Block className="clientName" caption="Terminal name">
                    <Field key={clientName} rawput={clientName} onOutput={(f, v)=>_clientName.set("", v)} />
                </Block>
            </div>
            <ThemeSelect/>
            <div className="scene">
                <div className="header">
                    {panels.map(({caption}, key)=>(
                        <Caption key={key} data-panel={key===panel ? "selected" : ""}>
                            <a onClick={_=>setPanel(key)}>{caption}</a>
                        </Caption>
                    ))}
                </div>
                <div className="panels">
                    {panels.map(({Content}, key)=>(
                        <Pane key={key} unmountOnExit expand={key===panel} transition={500}>
                            <Content />
                        </Pane>
                    ))}
                </div>
            </div>
        </Block>
    )
}