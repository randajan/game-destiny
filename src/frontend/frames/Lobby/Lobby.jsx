import React from 'react';

import { Block, Caption, Button, Field, Menu, usePop } from "@randajan/react-form";

import { game } from "../../game";
import { store } from '../../config/bases';

import { Rates } from './Rates/Rates';

import { ThemeSelect } from "./ThemeSelect/ThemeSelect";


import "./Lobby.scss";
import { Lights } from './Lights/Lights';
import { Crews } from './Crews/Crews';
import { ThemeNodes } from './ThemeNodes/ThemeNodes';


export const Lobby = (props)=>{
    const pop = usePop();

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
            <Menu trigger={<Caption>Rates</Caption>} noblur transition={500}><Rates/></Menu>
            <Menu trigger={<Caption>Nodes</Caption>} noblur transition={500}><ThemeNodes/></Menu>
            <Menu trigger={<Caption>Crew members</Caption>} noblur transition={500}><Crews/></Menu>
            <Menu trigger={<Caption>Lights</Caption>} noblur transition={500}><Lights/></Menu>
            
            
        </Block>
    )
}