import jet from "@randajan/jet-core";
import { BaseSync } from "@randajan/jet-base";

class LocalStore extends BaseSync {
    constructor() {

        super((base, config)=>{
            const id = config.id || "_BasicLocalStore";

            base.set(jet.json.from(localStorage.getItem(id)));

            base.watch("accepted", get=>{
                if (!get()) { localStorage.removeItem(id); }
            });

            base.watch("", get=>{
                const data = get();
                if (data?.accepted) { localStorage.setItem(id, jet.json.to(data)); }
            });
        });
        
    }

    accept() {
        return this.set("accepted", true);
    }

    dismiss() {
        return this.set("accepted", false);
    }
}


export const localStore = new LocalStore();