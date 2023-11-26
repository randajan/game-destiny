


import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";


import { channel } from "../io";

import { signIn, signUp, signOut } from "../modules/acc/sign";
import { getProfile, setProfile } from "../modules/acc/profile";

const emitUpdate = async (session, account)=>{
    session.account = account;
    const profile = account ? await getProfile(account) : {};
    channel.emit("acc", [...session.sockets], profile);
}



channel.use("acc/signIn", async (socket, formData)=>{
    return signIn(socket.session, formData, emitUpdate);
});

channel.use("acc/signUp", async (socket, formData)=>{
    return signUp(socket.session, formData, emitUpdate);
});

channel.use("acc/signOut", async (socket)=>{
    return signOut(socket.session, emitUpdate);
});

channel.use("acc/update", async (socket, data)=>{
    const { session } = socket;
    const res = await setProfile(session?.account, data);
    if (res) { emitUpdate(session, session.account); }
    return res;
});

channel.use("acc", async (socket)=>{
    return getProfile(socket.session?.account);
});