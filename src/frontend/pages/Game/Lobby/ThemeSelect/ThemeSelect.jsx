import React from 'react';

import { usePromise } from "@randajan/jet-react";
import { apiGet } from "../../../../config/api";

import { Button } from "@randajan/react-form";

import "./ThemeSelect.scss";
import { game } from '../../../../game';



export const ThemeSelect = (props)=>{
    const [ themes ] = usePromise([], _=>apiGet("themes"));
    const [ _themeId ] = game.board.use("theme.id");
    const themeId = _themeId.get();
    
    return (
        <div className="ThemeSelect">
            {themes.map(v=><Button className={v.id === themeId ? "current" : ""} key={v.id} onSubmit={_=>_themeId.set("", v.id)}>{v.name}</Button>)}
        </div>
    )
}

