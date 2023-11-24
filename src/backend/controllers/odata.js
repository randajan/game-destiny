
import info from "@randajan/simple-app/info";

import { koaBody } from "koa-body";
import fse from "fs-extra";
import jet from "@randajan/jet-core";
import odataResponder from "@randajan/odata-server/koa";

import { routes } from "../../arc/routes";
import { odata } from "../db/odata";
//import { authorizeMW } from "../db/auth";

import router from "../router";


// router.use(routes("odata"), authorizeMW());
router.use(routes("odata"), koaBody());
router.use(routes("odata"), async (ctx, next) => {
    if (ctx.method === "GET") { return next(); }
    return next();
});

router.all(routes("odata/appsheet/**"), odata.serve(odataResponder, routes("odata/appsheet", true), { tzWorkaround: true, useTimespan: true }));
router.all(routes("odata/raws/**"), odata.serve(odataResponder, routes("odata/raws", true)));
router.all(routes("odata/vals/**"), odata.serve(odataResponder, routes("odata/vals", true), { returnVals: true }));