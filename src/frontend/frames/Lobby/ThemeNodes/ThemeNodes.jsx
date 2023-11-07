import React from 'react';

import { Block } from "@randajan/react-form";

import "./ThemeNodes.scss";

export const ThemeNodes = (props)=>{
    const {} = props;

    const [ nodes ] = game.board.use("theme.nodes");
    
    return (
        <Block className="ThemeNodes" caption="Palubní systémy">
            {nodes.get()?.map((v, key)=>(
                <Block key={key} className="ThemeNode" caption={v.title}>
                </Block>
            ))}
        </Block>
    )
}

