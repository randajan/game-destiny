import { io } from "@randajan/simple-app/be/koa";
import jet from "@randajan/jet-core";
import ramdb from "@randajan/ram-db/async";
import meta from "../../arc/meta";
import { fdb } from "./files";

const _chops = {
    sys_accs:tbl=>tbl.rows.chopByCol("username"),
    // kin_contacts:tbl=>tbl.rows.chopByCol("accounts"),
    // sys_apis:tbl=>tbl.rows.chopByCol("authkey")
}

export const db = ramdb("main", async _=>{
    const entsData = await fdb.load("sys_ents");

    const tbls = {};

    for (const entName in meta) {

        tbls[entName] = {
            cols:meta[entName],
            rows:_=>fdb.load(entName)
        }

        if (entsData && !entsData[entName]) {
            entsData[entName] = {
                id:entName,
                singular:entName.replace(/s$/, ""),
                plural:entName,
                options:["READ", "ADD", "UPDATE", "REMOVE"].join("; ")
            };
        }

    }

    if (entsData) { await fdb.save("sys_ents", entsData); }

    return tbls;
}, {
    displayDefault:1, //every column is in the default accessible due to odata-server
    maxAge:0, //data never expires
    maxAgeError:5000 //errors will be cleared after 5 seconds
});

db.on("afterLoad", async _=>{
    return Promise.all(Object.entries(_chops).map(([entName, fce])=>db(entName).then(fce)));
});

db.on("beforeSave", async (action, row)=>{
    const { table, raws, key } = row;
    const rows = await table.rows.map(r=>r.saved.raws, { byKey:true });
  
    if (action === "remove") { delete rows[key]; }
    else { rows[key] = raws; }
  
    return fdb.save(table.name, rows);
});
