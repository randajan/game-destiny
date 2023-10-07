import { useEffect } from "react";
import { usePopOnPage } from "./usePopOnPage";

export const usePopPause = (pause, content)=>{
    const pop = usePopOnPage({ lock:true });

    useEffect(_=>{
        if (!pause) { pop.down(); }
        else { pop.up(content); }
    }, [pause, content]);

    return pop;
}