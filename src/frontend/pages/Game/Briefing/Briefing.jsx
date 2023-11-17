import React from 'react';

import { Block, Button, usePop } from "@randajan/react-form";

import "./Briefing.scss";
import { game } from '../../../game';
import { BriefCrew } from './BriefCrew/BriefCrew';


const BriefButton = props=>{
    const { id, name, isReady } = props;
    const pop = usePop();

    const onSubmit = isReady ? null : _=>{
        game.board.set(["crews", "list", id, "isReady"], true);
        pop.up(<BriefCrew { ...props}/>);
    };

    return (
        <Button className={ isReady ? "ready" : "pending"} onSubmit={onSubmit}>
            {name}
        </Button>
    )
}

export const Briefing = (props)=>{
    const {} = props;

    const [ _crewsList ] = game.board.use("crews.list");
    const crewsList = _crewsList.get();

    const pending = crewsList.filter(c=>!c.isReady);
    const enemies = crewsList.filter(c=>!c.isAlly);
    
    return (
        <Block className="Briefing" caption={ "Briefing"+String.jet.quote(pending.length, " (", ")") }>
            <div className={"flex"}>
                {crewsList.map((c, id)=><BriefButton key={id} id={id} {...c} enemies={enemies}/>)}
            </div>
        </Block>
    )
}

