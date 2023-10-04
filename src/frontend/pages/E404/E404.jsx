import React, { useState } from 'react';

import "./E404.scss";

export const E404 = (props)=>{
    const [enteredAt] = useState(_=>new Date());
    const {} = props;
    
    return (
        <div className="E404">
            {enteredAt.toLocaleDateString()}
            <p>Právě jsi opustil loď a nacházíš se ve smrtícím vzduchoprázdnu otevřeného vesmíru.</p>
            <p>Máš přibližně 30 vteřin života. Sbohem :)</p>
        </div>
    )
}

