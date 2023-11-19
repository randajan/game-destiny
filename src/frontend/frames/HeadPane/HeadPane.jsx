import React from 'react';

import { Img } from "@randajan/react-form";

import "./HeadPane.scss";

export const HeadPane = (props)=>{
    const {} = props;
    
    return (
        <nav className="HeadPane">
            <h1><Img alt={"Destiny"} src="/icons/logo.svg"/></h1>
        </nav>
    )
}

