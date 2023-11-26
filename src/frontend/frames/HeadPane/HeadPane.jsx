import React from 'react';

import { Img } from "@randajan/react-form";

import "./HeadPane.scss";
import { Profile } from './Profile/Profile';

export const HeadPane = (props)=>{
    const {} = props;
    
    return (
        <nav className="HeadPane">
            <p></p>
            <Img alt={"Destiny"} src="/icons/logo.svg"/>
            <Profile/>
        </nav>
    )
}

