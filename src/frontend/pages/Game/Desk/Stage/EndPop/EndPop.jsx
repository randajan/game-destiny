import React, { useEffect } from 'react';
import "./EndPop.scss";

import jet from "@randajan/jet-core";

import { Block } from "@randajan/react-form";


import { Button } from '@randajan/react-form';
import { game } from '../../../../../modules/game';



export const EndPop = (props)=>{
    const {id, title, info, isWin, main, onSubmit} = props;

    return (
        <Block className={`EndPop ${id} ${isWin ? "win" : "loose"}`} caption={title}>
            <div>{info}</div>
            {main ? <Button onSubmit={onSubmit}>Pokračovat</Button> : null}
        </Block>
    );
}



