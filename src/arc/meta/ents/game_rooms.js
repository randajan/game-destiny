import jet from "@randajan/jet-core";
import { nref, timestamps } from "@randajan/ram-db/async";

export default {
    "id": { isPrimary: true, init:_=>jet.uid(16) },
    "name": {},
    "password": { display:0 },
    "publics":{ separator:"; " },
    "owner":{ ref:"sys_accs" },
    ...timestamps("sys_accs")
}