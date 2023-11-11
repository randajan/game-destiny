import React from 'react';

import { Block, Field } from "@randajan/react-form";

import { game } from "../../game";
import { store } from '../../config/bases';

import { Rates } from './Rates/Rates';

import { ThemeSelect } from "./ThemeSelect/ThemeSelect";
import { NodesClients } from './NodesClients/NodesClients';


import "./Lobby.scss";








export const Lobby = (props)=>{
    const [ boardId ] = game.board.use("id");
    const [ _clientName ] = store.use("client.name");
    const clientName = _clientName.get();
    
    return (
        <Block className="Lobby" caption={"Game room: "+boardId.get()}>
            <Block className="clientName" caption="Terminal name">
                <Field key={clientName} rawput={clientName} onOutput={(f, v)=>_clientName.set("", v)} />
            </Block>
            
            <ThemeSelect/>
            <Rates/>
            <NodesClients/>
        </Block>
    )
}