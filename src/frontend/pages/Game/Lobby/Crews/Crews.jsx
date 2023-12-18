import React from 'react';

import { Field, Block, Button } from '@randajan/react-form';

import "./Crews.scss";
import { game } from '../../../../modules/game';

export const Crews = (props)=>{
    const {} = props;

    const [ _crews ] = game.board.use("crews");
    const crews = _crews.get();


    //const crews = _crews.get("list") || [];
    //const er = _crews.get("enemyRate");
    
    return (
        <Block className="Crews" caption={`Crew members` + String.jet.quote(crews.count, " (", ")")} data-crews={crews.count}>
            <div className="grid summary">
                <div className="ally">
                    <p>Alliance</p>
                    <p>{crews.countAlly}</p>
                </div>
                <div>vs.</div>
                <div className="enemy">
                    <p>Resistance</p>
                    <p>{crews.countEnemy} + {(crews.wildChance * 100).toFixed()}%</p>
                </div>
            </div>
            <div className="flex list">
                {crews?.list.map((c, id)=>(
                    <Block key={id} className="crew">
                        <Field key={c.name} maxLength={12} rawput={c.name} onOutput={(f, v)=>{ _crews.set(["list", id, "name"], v); }}/>
                        <Button onSubmit={_=>{ _crews.remove(["list", id]); }}>X</Button>
                    </Block>
                ))}
                <Button onSubmit={_=>{ _crews.set(["list", crews.count, "name"], ""); }}>+</Button>
            </div>
        </Block>
    )
}

