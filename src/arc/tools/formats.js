import jet from "@randajan/jet-core";

export const numFrame = (n, min=0, max=1)=>Number.jet.frame(Number.jet.to(n), min, max);
export const numGt = (n, min=0)=>Math.max(min, Number.jet.to(n));
export const numNo0Or1 = n => numGt(n) || 1;

export const fceSure = f => jet.isRunnable(f) ? f : ()=>{};

export const strSure = (...strs)=>{
    for (let s of strs) {
        if (s = String.jet.to(s)) { return s; }
    }
    return "";
}

export const bolOrTrue = b=>b == null ? true : Boolean.jet.to(b);

