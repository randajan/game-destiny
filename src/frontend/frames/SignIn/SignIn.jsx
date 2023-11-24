import React, { useState } from 'react';

import { Switch, Block, Form, Field, Button, usePop, Pane } from "@randajan/react-form";

import "./SignIn.scss";
import { apiPost } from '../../config/api';

export const SignIn = (props)=>{
    const {} = props;
    const [ register, setRegister ] = useState(false);

    return (
        <Block className="SignIn" caption="Sign In">
            <div>
                <a onClick={_=>setRegister(!register)}>{register ? "Existing" : "Create"} account</a>
            </div>
            <Form onOutputDirty={_=>console.log("aaa")}>
                <Field name="username" label="Username" maxLength={16}/>
                <Field name="password" type="password" label="Password"/>
                <Pane expand={register} transition={500}>
                    <Field name="passwordCheck" type="password" label="Password check"/>
                </Pane>
                <Button type="submit" onSubmit={async b=>{
                    const form = b.props.parent;
                    const data = form.getOutput();
                    const result = await apiPost(register ? "acc/signup" : "acc/signin", data);
                    console.log(result);
                    //form.submit();
                    return true;
                }}>Submit</Button>
            </Form>
        </Block>
    )
}

