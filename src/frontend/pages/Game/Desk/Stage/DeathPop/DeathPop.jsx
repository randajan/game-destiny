import React, { useState } from 'react';

import { Block, Button, Field } from "@randajan/react-form";

import "./DeathPop.scss";

export const DeathPop = (props)=>{
    const [ cc, setCc ] = useState();
    const { name, code, kick } = props;

    const lock = cc != code;

    return (
        <Block className="DeathPop" caption={name}>
            <Field label="Osobní kód" onOutput={(r, v)=>setCc(v)}/>
            <Button key={lock} lock={lock} onSubmit={kick}>Vyhodit z lodi</Button>
        </Block>
    )
}

