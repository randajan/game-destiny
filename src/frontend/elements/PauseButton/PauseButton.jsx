import React, { useEffect } from 'react';

import jet from "@randajan/jet-core";

import { usePop } from "@randajan/react-form";
import page from "@randajan/jet-react/page";

import { game } from '../../config/game';
import { Button } from '@randajan/react-form';
import { usePopPause } from '../../hooks/usePopPause';


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

