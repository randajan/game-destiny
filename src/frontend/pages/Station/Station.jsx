import React, { useEffect, useState } from 'react';

import "./Station.scss";

import { useRoute } from "@randajan/jet-react/dom";
import { game, useGame } from '../../config/game';

import { Button } from "@randajan/react-form";
import { E404 } from "../E404/E404";
import { usePop } from '@randajan/react-popup';


export const Station = (props)=>{
    const { params:{ id } } = useRoute();
    const data = useGame();
    const pop = usePop({ lock:true, children:"Dostavte se prosím neprodleně na můstek" });

    const pause = data?.current?.pause;
    useEffect(_=>{ if (pause === true) { pop.up(); } else if (pause === false) { pop.down(); } }, [pause]);

    if (!data) { return null; }
    const { solid, current } = data;

    if (!solid.nodes[id]) { return <E404/>; }

    const { title, info } = solid.nodes[id];
    const { isOn, health, powerSet } = current.nodes[id];

    return (
        <div className="Station">
            <h2>{title}</h2>
            <div>{info}</div>
            <div>{isOn ? "zapnuto" : "vypnuto"}</div>
            <div>výkon: {powerSet}</div>
            <div>kondice: {health}</div>
            <Button onSubmit={_=>{ game.set(["current.nodes", id, "health"], 1); }}>Opravit</Button>
        </div>
    )
}

