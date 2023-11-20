import { timespanToMs } from "@randajan/odata-server";
import odataServer from "@randajan/ram-db/odata";
import { db } from "./ramdb";
import { addTimezone, subTimezone } from "../../arc/tools/date";

const _actions = {
    metadata:"READ",
    collections:"READ",
    count:"READ",
    query:"READ",
    insert:"ADD",
    update:"UPDATE",
    remove:"REMOVE",
}

export const odata = odataServer(db, {
    fakeRemove:"$$remove",
    extender:async (context, config={})=>{

        context.returnVals = !!config.returnVals;
        context.tzWorkaround = !!config.tzWorkaround;
        context.useTimespan = !!config.useTimespan;
        context.auth = context.responder.context.auth;

    },
    converter:{
        "Edm.Duration":(value, method, context)=>{
            if (!context.useTimespan || value == null) { return value; }
            if (method === "toResponse") { return value / 86400000; } //appsheet is inconsistent
            if (method === "toAdapter") { return timespanToMs(value); }
        },
        "Edm.DateTimeOffset":(value, method, context)=>{
            if (!context.tzWorkaround || value == null) { return value; }
            //appsheet timezone bug workaround
            const dt = value instanceof Date ? value : new Date(value);
            if (method === "toResponse") { return addTimezone(dt); }
            else if (method === "toAdapter") { return subTimezone(dt); }
        }
    },
    returnVals:(context)=>context.returnVals,
    filter:async ({ auth, route, returnVals }, tbl, col)=>{

        if (col) { //dynamic column filter not implemented
            if (!(returnVals || col.display === 2 || !await col.isVirtual)) { return false; }
            if (tbl.name === "sys_accs" && col.name.startsWith("token_")) { return false; } // those columns are HUGE RISK
        }

        const action = _actions[route.action];
        if (!action) { return true; } //non sensitive action

        return true;
        //const { account, api } = auth;
        //is allowed by api ?
        //const allowed = await api(action);
        //return allowed.includes(tbl.name);
    }
    
});


