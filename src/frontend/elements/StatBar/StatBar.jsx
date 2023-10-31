import React from 'react';

import jet from "@randajan/jet-core";

import { Range } from '@randajan/react-form';

import "./StatBar.scss";

export const StatBar = props => {
    const { id, title, info, value, unit } = props;
    const vlabel = Number.jet.fromRatio(value, unit[0], unit[1]).toLocaleString(undefined, { maximumFractionDigits:1, minimumFractionDigits:1 }) + " " + unit[2];
    return (
        <div className={`StatBar ${id}`} title={info}>
            <Range key={value} label={<><p>{title}</p><b>{vlabel}</b></>} lock vertical rawput={(1 - value) * 100} from={0} to={100} />
        </div>
    )
}