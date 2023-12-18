import be, { app, http, io, bridge, info } from "@randajan/simple-app/be/koa";

import jet from "@randajan/jet-core";

import { Game } from "../modules/game/class/Game";
import { db } from "../db/ramdb";

const accept = async (content)=>({ isDone:true, code:200, content});
const reject = (code, message, details={})=>({isDone:false, code, reason:{ message, details }});

bridge.rx("game/create", async (socket)=>{
    const acc = socket.session.account;
    if (!acc) { return reject(403, "Unauthorized"); }
    const tbl = await db("game_rooms");
    return accept(await tbl.rows.add({ owner:acc }));
});

bridge.rx("game/connect", (socket, { gameId, client })=>Game.connect(socket, gameId, client));
bridge.rx("game/disconnect", (socket)=>Game.disconnect(socket));

bridge.rx("game/updateBoard", (socket, { id, data })=>Game.updateBoard(id, data));
bridge.rx("game/updateState", (socket, { id, data })=>Game.updateState(id, data));


io.on("connection", socket=>{
    socket.on("disconnect", _=>{
        Game.disconnect(socket);
    });
});