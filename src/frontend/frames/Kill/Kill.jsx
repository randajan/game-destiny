import React, { useEffect } from 'react';

import { Button } from "@randajan/react-form";

import "./Kill.scss";
import { usePopOnPage } from '../../hooks/usePopOnPage';
import { game } from '../../config/game';

const Kill = (props)=>{
    const { id } = props;

    const onSubmit = async _=>{
        const path = ["current.nodes", id];
        const data = await game.get(path);
        data.isKill = false;
        await game.set(path, data);
    }
    
    return (
        <div className="Kill">
            <p>Mrtvola</p>
            <Button onSubmit={onSubmit}>Ok...</Button>
        </div>
    )
}



export const KillPopUp = (props)=>{
    const killPop = usePopOnPage({ lock:true });

    const { isKill } = props;

    useEffect(_=>{
        if (!isKill) { killPop.down(); } else { killPop.up(<Kill {...props}/>); }
    }, [isKill]);

    return null;
}