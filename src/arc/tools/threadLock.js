export const threadLock = _=>{
    let lock;
    return async (exe, force=false, onLock)=>{
        if (lock && !force) { return onLock ? onLock() : undefined; }
        lock ++;
        let res, err;
        try { res = await exe(); } catch(e) { err = e; }
        lock --;
        if (err) { throw err; } else { return res; }
    }
}