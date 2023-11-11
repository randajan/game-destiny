import jet from "@randajan/jet-core";
import { BaseSync } from "@randajan/jet-base";
import store from "@randajan/jet-react/store";
import page from "@randajan/jet-react/page";

import { generateId } from "../../arc/tools/generateID";


store.acceptAll();

store.fit("client", (next, t, f)=>{
    const v = Object.jet.to(next(t));

    v.id = f?.id || generateId();
    v.name = v.name || v.id;

    return v;
});

export {
    store,
    page
}