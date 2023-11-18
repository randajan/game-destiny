import React from 'react';

import { Link } from "@randajan/jet-react/dom";
import { usePop, Field } from "@randajan/react-form";

import { page } from "../../config/bases";

import "./LadingPage.scss";

import { generateId } from '../../../arc/tools/generateId';



export const LadingPage = (props)=>{
    const {} = props;

    const pop = usePop();
    
    return (
        <div className="LadingPage">
            <Link to={`game/${generateId()}`}>Create game</Link>
            <a onClick={_=>pop.up(<Field focus label="Game room" onOutput={(r, v)=>{
                if (v) { pop.down(); page.set("pathname", `/game/${String.jet.simplify(v)}`); }
            }}/>)}>Join game</a>
        </div>
    )
}

