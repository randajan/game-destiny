import React, { useEffect } from 'react';
import "./EndPop.scss";

import jet from "@randajan/jet-core";

import { Block } from "@randajan/react-form";


import { Button } from '@randajan/react-form';



export const EndPop = ({id, title, info, isWin, showRestart})=>{
    return (
        <Block className={`EndPop ${id} ${isWin ? "win" : "loose"}`} caption="Konec">
            <div className="endTitle">{title}</div>
            <div>{info}</div>
            {showRestart ? <Button onSubmit={_=>game.set("current.restart", true)}>Hrát znovu!</Button> : null}
        </Block>
    );
}



