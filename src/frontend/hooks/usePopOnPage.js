import page from "@randajan/jet-react/page";
import { usePop } from "@randajan/react-form";
import { useEffect } from "react";

export const usePopOnPage = (props)=>{
    const [ _, getCngs ] = page.use("pathname");
    const changes = getCngs();

    const pop = usePop(props);

    useEffect(_=>{ if (changes.length) { pop.down(); } }, [changes]);

    return pop;
}