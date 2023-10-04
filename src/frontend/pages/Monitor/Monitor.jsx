import React, { useEffect } from 'react';

import objectToJSX from "@randajan/js-object-view/toJSX";
import jet from "@randajan/jet-core";

import { usePop } from "@randajan/react-popup";


import "./Monitor.scss";
import { game, useGame } from '../../config/game';
import { Switch, Range, Button } from '@randajan/react-form';
import '@randajan/react-form/css';

const ShipStat = props => {
    const { id, title, value, unit } = props;
    const vlabel = Number.jet.fromRatio(value, unit[0], unit[1]).toLocaleString(undefined, { maximumFractionDigits:1, minimumFractionDigits:1 }) + " " + unit[2];
    return (
        <div className={`Stat ${id}`}>
            <Range key={value} label={<><p>{title}</p><p>{vlabel}</p></>} lock vertical rawput={(1 - value) * 100} from={0} to={100} />
            
        </div>
    )
}

const ShipNode = props => {
    const { id, title, isOn, health, powerSet, power, energyUse } = props;
    const state = isOn ? "on" : "off";
    return (
        <>
            <h2 className={`nodeTitle ${state}`}>{title}</h2>
            <Switch key={"isOn" + isOn} label={state} rawput={isOn ? 1 : 0} onOutput={(s, v) => {
                game.set(["ship.nodes", id, "isOn"], !!v);
            }} />
            <Range key={"powerSet" + powerSet} label={"výkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                game.set(["ship.nodes", id, "powerSet"], v / 100);
            }} />
            <Range key={"health" + health} label={"kondice"} lock rawput={health * 100} from={0} to={100} />
        </>
    )
}

export const Monitor = (props) => {
    const data = useGame();
    const pop = usePop({ children:<Button onSubmit={_=>game.set(["pause"], false)}>Ukončit poradu</Button>, lock:true });

    const pause = data?.pause;

    useEffect(_=>{ if (pause === true) { pop.up() } else if (pause === false) { pop.down(); } }, [pause]);

    if (!data) { return null; }

    const { ship:{state, stats, nodes} } = data;

    return (
        <div className="Monitor">
            <div><h2>Stav lodi : {state}</h2><Button onSubmit={_=>game.set(["pause"], true)}>Svolat poradu</Button></div>
            <div className="stats">
                {jet.forEach(stats, (stat, id) => <ShipStat key={id} {...stat} />)}
            </div>
            <div className="nodes">
                {jet.forEach(nodes, (node, id) => <ShipNode key={id} {...node} />)}
            </div>
        </div>
    )
}


