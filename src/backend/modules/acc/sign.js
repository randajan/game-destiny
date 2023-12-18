


import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";


import { db } from "../../db/ramdb";

import bcrypt from "bcrypt";
import { validatePassword } from "./password";
import { getProfile } from "./profile";

const signDone = async (account)=>({ isDone:true, code:200, account, profile:await getProfile(account)});

const signReject = (code, message, details={})=>({isDone:false, code, reason:{ message, details }});

const validateFields = (fields, formData)=>{
    const required = fields.filter(n=>!formData[n]);
    if (required.length) { return signReject(400, "fields required", { required }); }
};

export const signIn = async (formData)=>{
    const r = validateFields(["username", "password"], formData);
    if (r) { return r; }

    const { username, password } = formData;

    const tbl = await db("sys_accs");

    const acc = (await tbl.rows.getChop("username").getList(username))[0];

    const check = !acc ? false : await bcrypt.compare(password, (await acc("password")));
    if (!check) { return signReject(401, `invalid credentials`); }

    return signDone(acc);
};

export const signUp = async (formData)=>{
    const r = validateFields(["username", "password", "passwordCheck"], formData);
    if (r) { return r; }

    const { username, password, passwordCheck } = formData;
    if (password !== passwordCheck) { return signReject(400, "password mismatch"); }

    const tbl = await db("sys_accs");
    const passwordUnsafe = validatePassword(password);
    if (passwordUnsafe.length) { return signReject(400, "password weak", { weakness:passwordUnsafe }); }

    const usernameCount = (await tbl.rows.getChop("username").count(username));
    if (usernameCount) { return signReject(400, "username taken"); }

    const hash = await bcrypt.hash(password, 10);
    const acc = await tbl.rows.addOrUpdate({username, password:hash});

    return signDone(acc);
};

export const signOut = async _=>signDone();