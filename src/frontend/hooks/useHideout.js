import { useEffect, useRef, useState } from "react";



export const useHideout = _=>{
    const [ state, setState ] = useState(false);
    const ref = useRef();

    useEffect(_=>{
        const el = ref.current;
        return !el ? undefined : Element.jet.listen(el, "mousedown", ev=>{
            ev.preventDefault();
            setState(true);
            const rmv = Element.jet.listen(document, "mouseup", _=>{
                setState(false);
                rmv();
            });
        });
    }, [ref.current]);

    return [ ref, state ];
}