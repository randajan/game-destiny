import React from 'react';

import { Field, Block, Button } from '@randajan/react-form';

import "./Crews.scss";
import { game } from '../../../game';

export const Crews = (props)=>{
    const {} = props;

    const [_er] = game.board.use("enemyRate");
    const [ _crews ] = game.board.use("crews");

    const crews = _crews.get() || [];
    const er = _er.get();
    
    return (
        <Block className="Crews" caption={`Crew members (${crews.length})`} data-crews={crews.length}>
            <div className="grid summary">
                <div className="ally">
                    <p>Alliance</p>
                    <p>{crews.length - Math.ceil(er)}</p>
                </div>
                <div>vs.</div>
                <div className="enemy">
                    <p>Resistance</p>
                    <p>{Math.floor(er)} + {(er % 1 * 100).toFixed()}%</p>
                </div>
            </div>
            <div className="flex list">
                {crews.map((c, id)=>(
                    <Block key={id} className="crew">
                        <Field key={c.name} rawput={c.name} onOutput={(f, v)=>{ _crews.set([id, "name"], v); }}/>
                        <Button onSubmit={_=>{ _crews.remove(id); }}>X</Button>
                    </Block>
                ))}
                <Button onSubmit={_=>{ _crews.set([String(crews.length), "name"], ""); }}>+</Button>
            </div>
        </Block>
    )
}

