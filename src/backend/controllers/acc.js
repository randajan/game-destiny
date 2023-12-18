


import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { signIn, signUp, signOut } from "../modules/acc/sign";
import { getProfile, getProfiles, setProfile } from "../modules/acc/profile";
import { db } from "../db/ramdb";

const brgByAcc = bridge.createGroup("byAccount", socket=>socket?.session?.account?.key);

const processReply = async (socket, reply)=>{
    const { isDone, account, profile } = reply;
    if (!isDone) { return reply; }
    const ses = socket.session;
    ses.account = account;
    brgByAcc.reset();
    await bridge.tx("acc", profile, socket.brothers); //signin, signout state send only sockets of current session
    return reply;
}

db("sys_accs").then(tbl=>{
    tbl.rows.on("afterUpdate", async acc=>{
        await brgByAcc.tx("acc", await getProfile(acc), acc.key);
    });
});

bridge.rx("acc/signIn", async (socket, formData)=>{
    return processReply(socket, await signIn(formData));
});

bridge.rx("acc/signUp", async (socket, formData)=>{
    return processReply(socket, await signUp(formData));
});

bridge.rx("acc/signOut", async (socket)=>{
    return processReply(socket, await signOut());
});

bridge.rx("acc", async (socket, data)=>{
    const account = socket.session?.account;
    if (data) { setProfile(account, data); }
    return getProfile(account);
});

bridge.rx("acc/list", async (socket)=>{
    return getProfiles(socket.session?.account);
});