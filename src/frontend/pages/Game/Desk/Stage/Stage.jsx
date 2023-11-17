import React from 'react';

import { Block, Caption } from "@randajan/react-form";

import "./Stage.scss";


export const Stage = (props)=>{
    const {} = props;

    const [ _stageId ] = game.state.use("stage");
    const stageId = _stageId.get();

    const [ _stages ] = game.board.use("theme.stages");
    const stage = _stages.get()?.find(s=>s.id === stageId);

    ////usePopPause(data?.current?.pause, "Dostavte se prosím neprodleně na můstek");
    
    return (
        <Block className="Stage">
            {/* <EndPopUp showRestart {...currentState}/> */}
            <p/>
            <Caption title={stage?.info}>{stage?.title}</Caption>
            {/* <p><PauseButton pause={current.pause}/></p> */}
        </Block>
    )
}

