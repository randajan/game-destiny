
import jet from "@randajan/jet-core";


const { safe } = jet.prop;


export const addVolume = (obj, priv, name, def=1)=>{
    safe(obj, priv, name, n=>Number.jet.round(Number.jet.frame(n, 0, 1), 4), n=>n || 0);
    obj[name] = def;
    return obj;
};
export const addSwitch = (obj, priv, name, def=true)=>{
    safe(obj, priv, name, b=>Boolean.jet.to(b), b=>b||false);
    obj[name] = def;
    return obj;
}

export const addVolumes = (obj, priv, defs={})=>{
    for (const n in defs) { addVolume(obj, priv, n, defs[n]); }
    return obj;
}

export const addSwitches = (obj, priv, defs={})=>{
    for (const n in defs) { addSwitch(obj, priv, n, defs[n]); }
    return obj;
}