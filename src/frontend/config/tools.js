import jet from "@randajan/jet-core";


export const threadLock = _=>{
    let lock;
    return async (exe, force=false, onLock)=>{
        if (lock && !force) { return jet.run(onLock); }
        lock ++
        const res = await exe();
        lock --;
        return res;
    }
}