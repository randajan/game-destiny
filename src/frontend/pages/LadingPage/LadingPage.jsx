import React from 'react';

import { Link } from "@randajan/jet-react/dom";
import { usePop, Field, Pane } from "@randajan/react-form";

import { page } from "../../config/bases";

import "./LadingPage.scss";

import { generateId } from '../../../arc/tools/generateId';



export const LadingPage = (props)=>{
    const {} = props;

    const [ _showJoin ] = page.use("hash.showJoin");
    const showJoin = _showJoin.get();

    
    return (
        <div className="LadingPage">
            <Link to={`game/${generateId()}`}>Create game</Link>
            <a onClick={_=>showJoin ? _showJoin.remove() : _showJoin.set("", 1)}>Join game</a>
            <Pane expand={!!showJoin} transition={500}>
                <Field focus label="Game room" onOutput={(r, v)=>{
                    if (v) { page.set("pathname", `/game/${String.jet.camelCase(v)}`); }
                }}/>
            </Pane>
        </div>
    )
}

