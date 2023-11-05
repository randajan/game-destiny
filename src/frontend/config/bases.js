import jet from "@randajan/jet-core";
import { BaseSync } from "@randajan/jet-base";
import store from "@randajan/jet-react/store";
import page from "@randajan/jet-react/page";

import { generateId } from "../../arc/tools/generateID";


store.acceptAll();
store.setDefault("client.id", generateId());

export {
    store,
    page
}