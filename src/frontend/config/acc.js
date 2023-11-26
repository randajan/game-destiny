import { BaseSync } from "@randajan/jet-base";
import { threadLock } from "../../arc/tools/threadLock";

import { bridge } from "@randajan/simple-app/fe";

import { channels } from "../../arc/routes";
import { channel } from "../config/io";
import { page } from "./bases";

const clientLock = threadLock();


class Account extends BaseSync {
    constructor() {

        super((base, config)=>{

            base.watch("", async (get, cngs)=>{
                clientLock(async _=>{
                    const data = jet.inflate(Object.fromEntries(cngs().map(p => [p, get(p)])));
                    return channel.emit("acc/update", data);
                });
            });

        });

        const loungeState = (pathname)=>{
            const id = this.get("id");
            return (!!id === pathname.startsWith("/lounge")) ? undefined : !!id;
        }

        this.watch("id", get=>{
            const ls = loungeState(page.get("pathname"));
            console.log(ls, this.get(), page.get("pathname"));
            if (ls === true) { page.set("pathname", "/lounge"); }
            else if (ls === false) { page.set("pathname", "/"); }

        });

        page.fit("pathname", (next, t, f)=>{
            const v = next(String.jet.tap(t, f));
            const ls = loungeState(v);
            return ls ? "/lounge" : ls === false ? "/" : v; 
        });

        channel.use("acc", data => {
            clientLock(_=>{ this.set("", data); });
        });

        this.refresh();
    }

    async refresh() {
        return clientLock(async _=>{
            const data = await channel.emit("acc");
            this.set("", data);
        });
    }

    async sign(register, formData) {
        return channel.emit("acc/" + (register ? "signUp" : "signIn"), formData);
    }

    async signOut() {
        return channel.emit("acc/signOut");
    }

}


export const account = new Account();