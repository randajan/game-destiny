import React from 'react';
import objectToJSX from "@randajan/js-object-view/toJSX";


import "./Monitor.scss";
import game from '../../config/game';

export const Monitor = (props)=>{
    game.use();

    
    return (
        <div className="Monitor">
            {objectToJSX(game.get())}
        </div>
    )
}

