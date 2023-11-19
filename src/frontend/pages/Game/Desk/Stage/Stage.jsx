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

    const pausePop = usePop({lock:true});
    const endPop = usePop({lock:true});

    useEffect(_=>{ if (pause) { pausePop.up(main ? <PausePop/> : "Dostavte se prosím neprodleně na můstek"); } else { pausePop.down(); } }, [pause]);
    useEffect(_=>{
        if (stage?.isEnd) {
            endPop.up(<EndPop {...stage} main={main} onSubmit={_=>{ endPop.down(); game.board.set("phase.id", 0); }}/>);
        }
        else {
            endPop.down();
        }
    }, [stageId]);
    
    return (
        <Block className={jet.melt(["Stage", className], " ")}>
            <div className="grid heading">
                <Timer stop={stage?.isEnd}/>
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

