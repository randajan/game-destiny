import React from 'react';

import jet from "@randajan/jet-core";

import { Range, Bar, Block } from '@randajan/react-form';

import "./StatBar.scss";
import { numFrame } from '../../../../../arc/tools/formats';


export const StatBar = props => {
    const { id, title, info, unit } = props;

    const [ _value ] = game.state.use(["stats", id, "value"]);
    const value = numFrame(_value.get());
    
    const vlabel = Number.jet.fromRatio(value, unit[0], unit[1]).toLocaleString(undefined, { maximumFractionDigits:1, minimumFractionDigits:1 }) + " " + unit[2];
    
    
    return (
        <Block className={`StatBar ${id}`} title={info} caption={title}>
            <b>{vlabel}</b>
            <Bar vertical value={(1 - value) * 100} from={0} to={100}/>
        </Block>
    )
}