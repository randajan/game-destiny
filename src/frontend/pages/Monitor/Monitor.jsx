import React, { useEffect } from 'react';

import objectToJSX from "@randajan/js-object-view/toJSX";
import jet from "@randajan/jet-core";

import { usePop } from "@randajan/react-popup";


import "./Monitor.scss";
import { game, useGame } from '../../config/game';
import { Switch, Range, Button } from '@randajan/react-form';
import '@randajan/react-form/css';

const ShipStat = props => {
    const { id, title, info, value, unit } = props;
    const vlabel = Number.jet.fromRatio(value, unit[0], unit[1]).toLocaleString(undefined, { maximumFractionDigits:1, minimumFractionDigits:1 }) + " " + unit[2];
    return (
        <div className={`Stat ${id}`} title={info}>
            <Range key={value} label={<><p>{title}</p><b>{vlabel}</b></>} lock vertical rawput={(1 - value) * 100} from={0} to={100} />
        </div>
    )
}

const ShipNode = props => {
    const { id, title, info, isOn, health, powerSet, power, energyUse } = props;
    const state = isOn ? "on" : "off";
    return (
        <>
            <h2 className={`nodeTitle ${state}`} title={info}>{title}</h2>
            <Switch key={"isOn" + isOn} label={state} rawput={isOn ? 1 : 0} onOutput={(s, v) => {
                game.set(["current.nodes", id, "isOn"], !!v);
            }} />
            <Range key={"powerSet" + powerSet} label={"výkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                game.set(["current.nodes", id, "powerSet"], v / 100);
            }} />
            <Range key={"health" + health} label={"stav"} lock rawput={health * 100} from={0} to={100} />
        </>
    )
}

export const Monitor = (props) => {
    const data = useGame();
    const pop = usePop({ children:<Button onSubmit={_=>game.set("current.pause", false)}>Ukončit poradu</Button>, lock:true });

    const pause = data?.current?.pause;
    useEffect(_=>{ if (pause === true) { pop.up() } else if (pause === false) { pop.down(); } }, [pause]);

    if (!data) { return null; }

    const { solid:{ states, stats, nodes }, current } = data;
    const currentState = states[current.state];

    return (
        <div className="Monitor">
            <div className="heading">
                <p/>
                <h2 title={currentState.info}>Stav lodi : {currentState.title}</h2>
                <p><Button onSubmit={_=>game.set("current.pause", true)}>Svolat posádku</Button></p>
            </div>
            <div className="stats">
                {jet.forEach(stats, (stat, id) => <ShipStat key={id} {...stat} {...current.stats[id]} />)}
            </div>
            <div className="nodes">
                {jet.forEach(nodes, (node, id) => <ShipNode key={id} {...node} {...current.nodes[id]} />)}
            </div>
        </div>
    )
}


