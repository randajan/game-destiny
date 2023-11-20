import React, { useState } from 'react';

import { Switch, Block, Form, Field, Button, usePop, Pane } from "@randajan/react-form";

import "./SignIn.scss";

export const SignIn = (props)=>{
    const {} = props;
    const [ kind, setKind ] = useState(false);

    return (
        <Block className="SignIn" caption="Sign In">
            <div>
                <a onClick={_=>setKind(!kind)}>{kind ? "Existing" : "Create"} account</a>
            </div>
            <Form onOutputDirty={_=>console.log("aaa")}>
                <Field name="username" label="Username" maxLength={16}/>
                <Field name="password" type="password" label="Password"/>
                <Pane expand={kind} transition={500}>
                    <Field name="passwordCheck" type="password" label="Password check"/>
                </Pane>
                <Button type="submit" onSubmit={b=>{
                    const form = b.props.parent;
                    form.submit();
                    const data = form.getOutput();
                    console.log(data);
                    return true;
                }}>Submit</Button>
            </Form>
        </Block>
    )
}

