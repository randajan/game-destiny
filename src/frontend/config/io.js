import { bridge } from "@randajan/simple-app/fe";
import { channels } from "../../arc/routes";


export const emit = async (event, data={})=>{
    return 
}

export const channel = {
    emit:async (channel, data)=>{
        const event = channels(channel);
        return new Promise((res, rej)=>{
            bridge.socket.emit(event, data, (ok, data)=>{
                if (ok) { res(data); } else { rej(data); }
            });
        });
    },
    use:(channel, reply)=>{
        const event = channels(channel);
        return bridge.socket.on(event, reply);
    }
}
