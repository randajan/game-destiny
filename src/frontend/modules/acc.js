import { BaseSync } from "@randajan/jet-base";

import { bridge } from "@randajan/simple-app/fe";

import { page } from "../config/bases";

class Account extends BaseSync {
    constructor() {

        super((base, config)=>{

            base.watch("", (get, cngs)=>{
                bridge.tx("acc", async tx=>{
                    const data = jet.inflate(Object.fromEntries(cngs().map(p => [p, get(p)])));
                    this.set("", await tx(data));
                });
            });

        });

        const loungeState = (pathname)=>{
            const id = this.get("id");
            return (!!id === pathname.startsWith("/lounge")) ? undefined : !!id;
        }

        this.watch("id", get=>{
            const ls = loungeState(page.get("pathname"));
            if (ls === true) { page.set("pathname", "/lounge"); }
            else if (ls === false) { page.set("pathname", "/"); }

        });

        page.fit("pathname", (next, t, f)=>{
            const v = next(String.jet.tap(t, f));
            const ls = loungeState(v);
            return ls ? "/lounge" : ls === false ? "/" : v; 
        });

        bridge.rx("acc", (socket, data)=> { this.set("", data); });

        this.refresh();
    }

    async refresh() {
        await bridge.tx("acc", async tx=>{
            this.set("", await tx());
        });
    }

    async sign(register, formData) {
        return bridge.threadLock("acc", async _=>{
            const reply = await bridge.tx("acc/" + (register ? "signUp" : "signIn"), formData);
            if (reply.isDone) { this.set("", reply.profile); }
            return reply;
        });
    }

    async signOut() {
        return bridge.threadLock("acc", async _=>{
            const reply = await bridge.tx("acc/signOut");
            if (reply.isDone) { this.set("", reply.profile); }
            return reply;
        });
    }

}


export const account = new Account();