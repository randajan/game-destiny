import React, { useRef } from 'react';

import jet from "@randajan/jet-core";

import { Block, Caption, Field, Range } from "@randajan/react-form";

import "./Rates.scss";


const Rate = (props)=>{
    const { id, title, value } = props;
    const ref = useRef();

    const onInput = (range, val)=>{
        if (ref.current) { ref.current.innerText = val.toFixed(1); }
    }

    const onOutput = (range, val)=>{
        game.board.set(["rates", id, "value"], val);
    }

    return (
        <>
            {/* <Field type="number" rawput={value} from={0} to={5} step={0.1}/> */}
            <Caption>{title}</Caption>
            <Range key={value} rawput={value} from={0.1} to={5} step={0.1} onInput={onInput} onOutput={onOutput}/>
            <p ref={ref} className="currentValue">{value?.toFixed(1)}</p>
        </>
    )
}

export const Rates = (props)=>{
    const {} = props;

    const [ rates ] = game.board.use("rates");
    
    return (
        <Block className="Rates" caption={"Obtížnost"}>
            <Block className="grid">
                {jet.forEach(rates.get(), (v, key)=><Rate key={key} {...v}/>)}
            </Block>
        </Block>
    )
}

