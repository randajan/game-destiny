import React from 'react';

import { Form, Field, Button, Pane } from "@randajan/react-form";

import { account } from "../../modules/acc";

import "./Lounge.scss";

export const Lounge = (props)=>{
    const {} = props;

    const [ _acc ] = account.use();
    const acc = _acc.get();

    const onOutput = (field, value)=>{
        account.set(field.props.name, value);
    }
    
    return (
        <div className="Lounge">
            <Field name="name" key={"name"+acc?.name} label="Name" maxLength={16} rawput={acc?.name} onOutput={onOutput}/>
            <Field name="pin" key={"pin"+acc?.pin} type="password" label="PIN" rawput={acc?.pin} onOutput={onOutput}/>
            <Button onSubmit={async _=>{
                console.log(await bridge.tx("game/create"));
            }}>Create Game</Button>
        </div>
    )
}


