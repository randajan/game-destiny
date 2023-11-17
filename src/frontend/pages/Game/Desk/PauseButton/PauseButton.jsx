import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import { Button } from '@randajan/react-form';
import { usePopPause } from '../../hooks/usePopPause';
import { game } from '../../game';



const PausePop = ()=>{
    return (
        <Button onSubmit={_=>game.set("current.pause", false)}>
            Ukončit svolání posádky
        </Button>
    )
    
}

export const PauseButton = ({pause})=>{
    const pop = usePopPause(pause, <PausePop/>)

    return (
        <Button onSubmit={_=>game.set("current.pause", true)}>
            Svolat posádku
        </Button>
    )
    
}

