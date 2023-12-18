import React from 'react';

import "./Profile.scss";
import { account } from '../../../modules/acc';

export const Profile = (props)=>{
    const {} = props;

    const [ _acc ] = account.use();
    const acc = Object.jet.to(_acc.get());
    
    return (
        <div className="Profile">
            {acc.name || acc.username}
            {!acc.id ? null : <a onClick={_=>{ account.signOut(); }}>Sign Out</a> }
        </div>
    )
}

