import React from 'react';

import { Button, Block, usePop } from "@randajan/react-form";
import { game } from "../../../../../modules/game";

import "./PausePop.scss";

import { Timer } from '../../../../../elements/Timer/Timer';
import { DeathPop } from "../DeathPop/DeathPop";



export const PausePop = ()=>{
    const deathPop = usePop();

    const [ _deathReveal ] = game.board.use("mods.deathReveal.active");
    const deathReveal = _deathReveal.get();

    const [ _crewsList ] = game.board.use("crews.list");
    const crewsList = _crewsList.get();

    const [ _crewsState ] = game.state.use("crews.list");
    const crewsState = _crewsState.get();

    const alive = crewsState.filter(c=>c.isAlive);

    return (
        <Block className="PausePop" caption={"Svolání posádky" + String.jet.quote(alive.length, " (", ")")}>
            <Timer/>
            <div className="crews">
                {crewsState.map(c=>{
                    const crew = crewsList[c.id];
                    const kick = _=>{ _crewsState.set([c.id, "isAlive"], false); deathPop.down(); }
                    const onSubmit = _=>deathPop.up(<DeathPop {...crew} {...c} kick={kick}/>);
                    const className = (!deathReveal || c.isAlive) ? "" : crew.isAlly ? "ally" : "enemy";
                    
                    return (
                        <Button key={c.id+":"+c.isAlive} className={className} lock={!c.isAlive} onSubmit={onSubmit}>
                            {crewsList[c.id].name}
                        </Button>
                    )
                })}
            </div>

            <Button onSubmit={_=>game.state.set("pause", false)}>
                Ukončit svolání
            </Button>
        </Block>
    )
}

