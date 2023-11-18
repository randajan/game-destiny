import React, { useEffect } from 'react';

import { Block, Caption, Button, usePop } from "@randajan/react-form";

import { PausePop } from "./PausePop/PausePop";
import { EndPop } from "./EndPop/EndPop";

import "./Stage.scss";
import { Timer } from '../../../../elements/Timer/Timer';


export const Stage = (props)=>{
    const { main, className, caption, children } = props;

    const [ _stageId ] = game.state.use("stage");
    const stageId = _stageId.get();

    const [ _stages ] = game.board.use("theme.stages");
    const stage = _stages.get()?.find(s=>s.id === stageId);

    const [ _pause ] = game.state.use("pause");
    const pause = _pause.get();

    const pausePop = usePop({lock:true, children:main ? <PausePop/> : "Dostavte se prosím neprodleně na můstek"});
    const endPop = usePop({lock:true, children:<EndPop main={main}/>});

    useEffect(_=>{ if (pause) { pausePop.up(); } else { pausePop.down(); } }, [pause]);
    useEffect(_=>{ if (stage?.isEnd) { endPop.up(); } else { endPop.down(); } }, [stageId]);
    
    return (
        <Block className={jet.melt(["Stage", className], " ")}>
            <div className="grid heading">
                <Timer/>
                <div>
                    <Caption level={1}>{caption}</Caption>
                    <Caption level={2} title={stage?.info}>{stage?.title}</Caption>
                </div>
                <Button onSubmit={_=>{_pause.set("", true)}}>Svolat posádku</Button>
            </div>
            {children}
        </Block>
    )
}

