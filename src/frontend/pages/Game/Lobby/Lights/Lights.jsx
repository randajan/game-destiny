import React from 'react';

import { Block, Button, Field } from '@randajan/react-form';

import "./Lights.scss";
import { store } from '../../../../config/bases';

export const Lights = (props)=>{
    const {} = props;

    const [ _lights ] = store.use("io.lights");
    const lights = _lights.get();


    return (
        <Block className="Lights" caption="Real lights">
            <div className="flex list">
                {lights.map((c, id)=>(
                    <Block key={id} className="crew">
                        <Field key={id} maxLength={32} rawput={c.host} onOutput={(f, v)=>{ _lights.set([id, "host"], v); }}/>
                        <Button onSubmit={_=>{ _lights.remove(id); }}>X</Button>
                    </Block>
                ))}
                <Button onSubmit={_=>{ _lights.set([lights.length, "host"], ""); }}>+</Button>
            </div>
        </Block>
    )
}

