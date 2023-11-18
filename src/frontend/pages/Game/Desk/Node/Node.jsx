import React, { Component } from 'react';
import jet from "@randajan/jet-core";

import { Switch, Range, Button, Block } from '@randajan/react-form';

import "./Node.scss";
import { StatBar } from '..//StatBar/StatBar';

import { NodeMwPopUp } from './NodeMw/NodeMw';
import { Stage } from '../Stage/Stage';
import { game } from '../../../../game';
import { numFrame } from '../../../../../arc/tools/formats';

const _flags = {
    on:({isOn})=>isOn,
    off:({isOn})=>!isOn,
    mw:({isMw})=>isMw,
    dmg:({health})=>health < 0.0001
}

export const getFlags = state=>Component.jet.flags(_flags, state);

export const Node = (props)=>{

    const { id, title, info, stat } = props;

    const [ _stats ] = game.board.use("theme.stats");
    const stats = _stats.get();

    const [ _state ] = game.state.use(["nodes", id]);
    const state = _state.get();

    const isOn = numFrame(state?.isOn);
    const health = numFrame(state?.health);

    const flags = getFlags(state || {});

    return (
        <Stage className="Node" caption={title}>
            <NodeMwPopUp {...props} {...state}/>
            <div className="nodeStats">
                {stats.filter(s=>s.id === "energy" || s.id === stat).map(s=><StatBar key={s.id} {...s}/>)}
            </div>
            <div className="nodeMw">
                <Button onSubmit={_=>{ _state.set("isMw", true); }}>Opravit</Button>
            </div>
            <div className="nodeControl">
                <Switch className="nodeIsOn" key={"isOn"+isOn} label={isOn?"on":"off"} rawput={isOn ? 1 : 0} onOutput={(s, v) => {
                    _state.set("isOn", !!v);
                }} data-node={flags}/>
                <Range className="nodeHealth" key={"helath"+health} label={"stav"} lock rawput={health * 100} from={0} to={100} data-node={flags}/>
            </div>
            <div className="nodeInfo">{info}</div>
        </Stage>
    )
}

