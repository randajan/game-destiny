import { bridge } from "@randajan/simple-app/fe";


export const emit = async (event, data={})=>{
    return new Promise((res, rej)=>{
        bridge.socket.emit(event, data, (ok, data)=>{
            if (ok) { res(data); } else { rej(data); }
        });
    });
}
