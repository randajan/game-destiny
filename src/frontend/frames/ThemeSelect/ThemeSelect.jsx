import React from 'react';

import { usePromise } from "@randajan/jet-react";
import { apiGet } from "../../config/api";

import { Button } from "@randajan/react-form";

import "./ThemeSelect.scss";
import { game } from '../../game';



export const ThemeSelect = (props)=>{
    const {} = props;

    const [ themes ] = usePromise([], _=>apiGet("themes"));
    const [ current ] = game.board.use("theme");
    const currentId = current.get("id");
    
    return (
        <div className="ThemeSelect">
            {themes.map(v=><Button className={v.id === currentId ? "current" : ""} key={v.id} onSubmit={_=>current.set("id", v.id)}>{v.name}</Button>)}
        </div>
    )
}

