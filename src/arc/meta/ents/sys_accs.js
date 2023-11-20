import jet from "@randajan/jet-core";
import { nref, timestamps } from "@randajan/ram-db/async";

export default {
    "id": { isPrimary: true, init:jet.uid(8) },
    "username": {},
    "name": {},
    "avatar": {},
    "password": { display:0 },
    "pin":{},
    "email":{},
    "phone":{},
    "publics":{ separator:"; " },
    ...timestamps("sys_accs")
}