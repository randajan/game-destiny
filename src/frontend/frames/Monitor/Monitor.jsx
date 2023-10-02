import React from 'react';
import { usePromise } from "@randajan/jet-react";
import objectToJSX from "@randajan/js-object-view/toJSX";
import jet from "@randajan/jet-core";


import "./Monitor.scss";
import { gameBase } from '../../config/gameBase';
import { Switch, Range } from '@randajan/react-form';
import '@randajan/react-form/css';

const _statsTitles = {
    energy:"energie",
    battery:"baterie",
    health:"kondice",
    oxygen:"kyslík",
    heat:"teplota",
    direction:"kurz",
    distance:"vzdálenost"
}

const ShipStat = props => {
    return (
        <div className="Stat">
            <Range key={props.value} label={_statsTitles[props.id]} lock vertical rawput={(1 - props.value) * 100} from={0} to={100} />
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
                gameBase.set(["ship.nodes", id, "isOn"], !!v);
            }} />
            <Range key={"powerSet" + powerSet} label={"příkon"} rawput={powerSet * 100} from={0} to={100} onOutput={(s, v) => {
                gameBase.set(["ship.nodes", id, "powerSet"], v / 100);
            }} />
            <Range key={"health" + health} label={"kondice"} lock rawput={health * 100} from={0} to={100} />
        </>
    )
}


export const Monitor = (props) => {
    const [gmb, getChanges] = gameBase.use();
    const [data, refresh] = usePromise(null, _ => gameBase.get(), [getChanges]);

    if (!data) { return; }

    const { state, stats, nodes } = data.ship;

    return (
        <div className="Monitor">
            <h2>Stav lodi : {state}</h2>
            <div className="stats">
                {jet.forEach(stats, (stat, id) => <ShipStat key={id} id={id} value={stat} />)}
            </div>
            <div className="nodes">
                {jet.forEach(nodes, (node, id) => <ShipNode key={id} {...node} />)}
            </div>
        </div>
    )
}

