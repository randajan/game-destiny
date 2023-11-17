import React, { useRef } from 'react';

import jet from "@randajan/jet-core";

import { Block, Caption, Switch, Range } from "@randajan/react-form";

import "./Mods.scss";


const Mod = (props)=>{
    const { id, title, infoOn, infoOff, active } = props;

    const onOutput = (range, val)=>{
        game.board.set(["mods", id, "active"], val);
    }

    return (
        <>
            <Caption>{title}</Caption>
            <Switch key={active} rawput={active ? 1 : 0} onOutput={onOutput}/>
            <div>{active ? infoOn : infoOff}</div>
        </>
    )
}

export const Mods = (props)=>{
    const {} = props;

    const [ mods ] = game.board.use("mods");
    
    return (
        <Block className="Mods" caption={"Modifiers"}>
            <Block className="grid">
                {jet.forEach(mods.get(), (v, key)=><Mod key={key} {...v}/>)}
            </Block>
        </Block>
    )
}

