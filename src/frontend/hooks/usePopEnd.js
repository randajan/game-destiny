import React, { useEffect } from "react";
import { usePopOnPage } from "./usePopOnPage";
import { EndPop } from "../elements/EndPop/EndPop";


export const usePopEnd = (props)=>{
    const pop = usePopOnPage({ lock:true });
    const { isEnd } = props;

    useEffect(_=>{
        if (!isEnd) { pop.down(); }
        else { pop.up(<EndPop {...props}/>); }
    }, [isEnd]);

    return pop;
}