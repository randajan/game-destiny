import React from 'react';
import { usePromise } from "@randajan/jet-react";
import objectToJSX from "@randajan/js-object-view/toJSX";
import jet from "@randajan/jet-core";


import "./Monitor.scss";
import { game } from '../../config/game';
import { Switch, Range } from '@randajan/react-form';
import '@randajan/react-form/css';

const ShipStat = props => {
    const { id, title, value } = props;
    return (
        <div className="Stat">
            <Range key={value} label={title} lock vertical rawput={(1 - value) * 100} from={0} to={100} />
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
    const [gmb, getChanges] = game.use();
    const [data, refresh] = usePromise(null, _ => game.get(), [getChanges]);

    if (!data) { return; }

    const { state, stats, nodes } = data.ship;

    return (
        <div className="Monitor">
            <h2>Stav lodi : {state}</h2>
            <div className="stats">
                {jet.forEach(stats, (stat, id) => <ShipStat key={id} {...stat} />)}
            </div>
            <div className="nodes">
                {jet.forEach(nodes, (node, id) => <ShipNode key={id} {...node} />)}
            </div>
        </div>
    )
}

