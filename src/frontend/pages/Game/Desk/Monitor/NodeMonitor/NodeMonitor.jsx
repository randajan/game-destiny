import React, { useEffect, useState, Component } from 'react';
import jet from "@randajan/jet-core";



import { game } from '../../../../../modules/game';

import { Switch, Range } from '@randajan/react-form';


import "./NodeMonitor.scss";
import { numFrame } from '../../../../../../arc/tools/formats';

const _flags = {
    on:({isOn})=>isOn,
    off:({isOn})=>!isOn,
    mw:({isMw})=>isMw,
    dmg:({health})=>health < 0.0001
}

export const getFlags = state=>Component.jet.flags(_flags, state);

export const NodeMonitor = props => {
    const { id, title, info } = props;

    const [ _state ] = game.state.use(["nodes", id]);
    const state = _state.get();
    const powerSet =  numFrame(state?.powerSet);

    const flags = getFlags(state || {});

    return (
        <>
            <h2 className="nodeTitle" title={info} data-node={flags}>{title}</h2>
            <Range className="nodePowerSet" key={powerSet} label={"výkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                _state.set("powerSet", v / 100);
            }} data-node={flags}/>
        </>
    )
}