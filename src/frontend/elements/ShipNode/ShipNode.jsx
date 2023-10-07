import React, { useEffect, useState } from 'react';
import jet from "@randajan/jet-core";



import { useRoute } from "@randajan/jet-react/dom";
import { game, useGame } from '../../config/game';

import { Switch, Range } from '@randajan/react-form';


import "./ShipNode.scss";


export const ShipNode = props => {
    const { id, title, info, isOn, health, powerSet, withTitle } = props;
    const state = isOn ? "on" : "off";
    
    return (
        <>
            {withTitle ? <h2 className={`nodeTitle ${state}`} title={info}>{title}</h2> : null }
            <Switch className="nodeIsOn" key={"isOn" + isOn} label={state} rawput={isOn ? 1 : 0} onOutput={(s, v) => {
                game.set(["current.nodes", id, "isOn"], !!v);
            }} />
            <Range className="nodePowerSet" key={"powerSet" + powerSet} label={"výkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                game.set(["current.nodes", id, "powerSet"], v / 100);
            }} />
            <Range className="nodeHealth" key={"health" + health} label={"stav"} lock rawput={health * 100} from={0} to={100} />
        </>
    )
}