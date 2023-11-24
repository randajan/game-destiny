


import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import { apiError } from "../../router";

import { db } from "../../db/ramdb";

import bcrypt from "bcrypt";
import { validatePassword } from "./password";


export const signIn = async (username, password)=>{
    if (!username || !password) { throw apiError(401, "fields required", { required:["username", "password"] }); }

    const tbl = await db("sys_accs");

    const acc = (await tbl.rows.getChop("username").getList(username))[0];
    const check = !acc ? false : await bcrypt.compare(password, (await acc("password")));
    if (!check) { throw apiError(401, `invalid credentials`); }

    return acc;
};

export const signUp = async (username, password, passwordCheck)=>{
    if (!username || !password || !passwordCheck) { throw apiError(401, "fields required", { required:["username", "password", "passwordCheck"] }); }
    if (password !== passwordCheck) { throw apiError(401, "password mismatch"); }

    const tbl = await db("sys_accs");
    const passwordUnsafe = validatePassword(password);
    if (passwordUnsafe.length) { throw apiError(401, "password weak", { weakness:passwordUnsafe }); }

    const usernameCount = (await tbl.rows.getChop("username").count(username));
    if (usernameCount) { throw apiError(401, "username taken"); }

    const hash = await bcrypt.hash(password, 10);
    return tbl.rows.addOrUpdate({username, password:hash});

};