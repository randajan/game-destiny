import { io } from "@randajan/simple-app/be/koa";
import { channels } from "../arc/routes";

const _events = {

};

io.on("connection", socket=>{
    for (let event in _events) {
        socket.on(event, async (body, ack)=>{
            const rsp = _events[event];
            if (!rsp) { await ack(false, `BE > Unknown event '${event}'`); }
            try { await ack(true, await rsp(socket, body)); }
            catch(err) {
                console.warn(err);
                await ack(false, `BE > ${err}`);
            }
        });
    }
});

export const channel = {
    emit:async (channel, sockets, data)=>{
        const event = channels(channel);
        return Promise.all(sockets.map(s=>s?.emit(event, data)));
    },
    use:(channel, reply)=>{
        const event = channels(channel);
        if (_events[event]) { throw Error(`Channeůĺ allready used '${channel}'`); }
        _events[event] = reply;
        return _=>delete _events[event];
    }
}