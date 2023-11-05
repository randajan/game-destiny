import { info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";
import fdbc from "@randajan/file-db";

const { slash } = info;

const _rootDB = info.dir.root+slash+`db`;

export const fdb = fdbc({
    root:_rootDB,
    alias:"main",
    extension:"fdb",
    key:info.dbKey,
    slash
});