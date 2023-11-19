import React from 'react';

import { Block, Button, Img } from "@randajan/react-form";

import "./KillPop.scss";

export const KillPop = (props)=>{
    const { onSubmit } = props;
    
    return (
        <Block className="KillPop">
            <Img alt="Mrtvola" src="/icons/kill.svg"/>
            <Button onSubmit={onSubmit}>Jsem mrtvola</Button>
        </Block>
    )
}

