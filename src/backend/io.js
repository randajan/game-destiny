import { io } from "@randajan/simple-app/be/koa";

const _events = {

};

io.on("connection", socket=>{
    for (let event in _events) {
        socket.on(event, async (body, ack)=>{
            const rsp = _events[event];
            if (!rsp) { ack(false, `BE > Unknown event '${event}'`); }
            try { ack(true, await rsp(socket, body)); }
            catch(err) {
                console.warn(err);
                ack(false, `BE > ${err}`);
            }
        });
    }
});


export const events = {
    use:(event, callback)=>{
        if (_events[event]) { throw Error(`Event allready registered '${event}'`); }
        _events[event] = callback;
        return _=>delete _events[event];
    }
}