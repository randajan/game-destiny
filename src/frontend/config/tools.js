export const threadLock = _=>{
    let lock;
    return async (exe, force=false)=>{
        if (lock && !force) { return; }
        lock = true;
        const res = await exe();
        lock = false;
        return res;
    }
}