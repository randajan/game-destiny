import React, { useState } from 'react';

import { Switch, Block, Form, Field, Button, usePop, Pane } from "@randajan/react-form";

import "./SignIn.scss";

import { account } from '../../config/acc';

export const SignIn = (props)=>{
    const { onDone } = props;
    const [ register, setRegister ] = useState(false);
    const [ { reason }, setResult ] = useState({});

    const onSubmit = async b=>{
        const form = b.props.parent;
        const result = await account.sign(register, form.getOutput());
        if (result?.isDone) {
            form.submit();
            onDone(result);
        }
        setResult(result);
    }

    return (
        <Block className="SignIn" caption="Sign In">
            <div>
                <a onClick={_=>setRegister(!register)}>{register ? "Existing" : "Create"} account</a>
            </div>
            <Form>
                <Field name="username" label="Username" maxLength={16}/>
                <Field name="password" type="password" label="Password"/>
                <Pane expand={register} transition={500}>
                    <Field name="passwordCheck" type="password" label="Password check"/>
                </Pane>
                <div>{reason?.message}</div>
                <Button type="submit" onSubmit={onSubmit}>Submit</Button>
            </Form>
        </Block>
    )
}

