import React from 'react';

import jet from "@randajan/jet-core";

import { Block, Field } from "@randajan/react-form";

import "./Rates.scss";

export const Rates = (props)=>{
    const {} = props;

    const [ rates ] = game.board.use("rates");
    
    return (
        <Block className="Rates" caption={"Nastavení"}>
            {jet.forEach(rates.get(), (v, key)=>(
                <Block key={key} className="Rate" caption={v?.title}>
                </Block>
            ))}
        </Block>
    )
}

