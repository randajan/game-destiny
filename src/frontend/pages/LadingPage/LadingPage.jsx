import React from 'react';

import { Link } from "@randajan/jet-react/dom";
import { Button, usePop } from "@randajan/react-form";

import "./LadingPage.scss";
import { apiGet } from '../../config/api';
import { usePromise } from '@randajan/jet-react';
import { generateId } from '../../../arc/tools/generateId';




export const LadingPage = (props)=>{
    const {} = props;

    const pop = usePop({ lock:true });

    const back = _=>pop.down();
    
    return (
        <div className="LadingPage">
            <Link to={`game/${generateId()}`}>Create game</Link>
            <Button onSubmit={_=>pop.up(<SelectTheme back={back}/>)}>Join game</Button>
        </div>
    )
}

