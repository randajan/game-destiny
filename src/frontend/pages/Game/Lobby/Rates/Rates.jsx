import React, { useRef } from 'react';

import jet from "@randajan/jet-core";

import { Block, Caption, Field, Range } from "@randajan/react-form";

import "./Rates.scss";


const Rate = (props)=>{
    const { id, title, value } = props;
    const ref = useRef();

    const onInput = (range, val)=>{
        if (ref.current) { ref.current.innerText = (val*100).toFixed() + "%"; }
    }

    const onOutput = (range, val)=>{
        game.board.set(["rates", id, "value"], val);
    }

    return (
        <>
            <Caption>{title}</Caption>
            <Range key={value} rawput={value} from={0.01} to={3} step={0.01} onInput={onInput} onOutput={onOutput}/>
            <p ref={ref} className="currentValue">{(value*100).toFixed() + "%"}</p>
        </>
    )
}

export const Rates = (props)=>{
    const {} = props;

    const [ rates ] = game.board.use("rates");
    
    return (
        <Block className="Rates" caption={"Global rates"}>
            <Block className="grid">
                {jet.forEach(rates.get(), (v, key)=><Rate key={key} {...v}/>)}
            </Block>
        </Block>
    )
}

