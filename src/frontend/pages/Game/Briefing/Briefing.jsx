import React from 'react';

import { Block, Button, usePop } from "@randajan/react-form";

import "./Briefing.scss";
import { game } from '../../../game';


const BriefCrew = props=>{
    const { id, name, isAlly, code, enemies } = props;

    return (
        <Block level={0} caption={name}>
            <Block className="code" caption="Passcode">
                <div>{code}</div>
            </Block>
            <Block className="role" caption="Role">
                {isAlly ? <div className="ally">Alliance</div> : <div className="enemy">Resistance</div>}
            </Block>
            {isAlly ? null :
                <Block className="partners" caption="Partners">
                    {enemies.filter(r=>r.code !== code).map((e, i)=>(
                        <div key={i} className="partner enemy">
                            {e.name}
                        </div>
                    ))}
                </Block>
            }
        </Block>
    )
}

const BriefButton = props=>{
    const { id, name, isReady } = props;
    const pop = usePop(<BriefCrew { ...props}/>);

    const onSubmit = isReady ? null : _=>{
        game.board.set(["crews", "list", id, "isReady"], true);
        pop.up();
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
        <Block className="Briefing" caption="Briefing">
            <Block className="crews" caption={ "Crews"+String.jet.quote(pending.length, " (", ")") }>
                <div className={"flex"}>
                    {crewsList.map((c, id)=><BriefButton key={id} id={id} {...c} enemies={enemies}/>)}
                </div>
                
            </Block>
            <div className="ctrls">
                <Button onSubmit={_=>game.board.set("phase", 0)}>Reset briefing</Button>
                <Button onSubmit={_=>game.board.set("phase", 0)}>We are ready</Button>
            </div>

        </Block>
    )
}

