import React, { useEffect, useState, Component } from 'react';
import jet from "@randajan/jet-core";



import { useRoute } from "@randajan/jet-react/dom";
import { game, useGame } from '../../config/game';

import { Switch, Range } from '@randajan/react-form';


import "./NodeCtrl.scss";

const _flags = {
    on:({isOn})=>isOn,
    off:({isOn})=>!isOn,
    mw:({isMw})=>isMw,
    dmg:({health})=>health < 0.0001
}

export const getFlags = nodeProps=>Component.jet.flags(_flags, nodeProps);

export const NodeCtrl = props => {
    const { id, title, info, isOn, isMw, health, powerSet, full } = props;
    const state = isOn ? "on" : "off";

    const flags = getFlags(props);

    return (
        <>
            {full ? <h2 className="nodeTitle" title={info} data-node={flags}>{title}</h2> : null }
            <Switch lock={full} className="nodeIsOn" key={"isOn" + isOn+isMw} label={state} rawput={isOn ? 1 : 0} onOutput={(s, v) => {
                game.set(["current.nodes", id, "isOn"], !!v);
            }} data-node={flags}/>
            <Range lock={!full} className="nodePowerSet" key={"powerSet" + powerSet+isMw} label={"výkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                game.set(["current.nodes", id, "powerSet"], v / 100);
            }} data-node={flags}/>
            <Range className="nodeHealth" key={"health" + health} label={"stav"} lock rawput={health * 100} from={0} to={100} data-node={flags}/>
        </>
    )
}