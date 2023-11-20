
import jet, { Plex } from "@randajan/jet-core";

const { solid, cached, virtual } = jet.prop;

class RouteTree extends Plex {

    static createIndex(parent, sub) {
        const index = {};

        if (jet.isRunnable(sub)) {
            sub((key, path, sub)=>index[key] = new RouteTree(parent, key, path, sub));
        }
        else if (Array.isArray(sub)) {
            for (const key of sub) { index[key] = new RouteTree(parent, key); }
        }
        else if (Object.jet.is(sub)) {
            for (const key in sub) { index[key] = new RouteTree(parent, key, sub[key]); }
        }

        return index;
    }

    constructor(parent, key, path, sub) {
        if (typeof path !== "string") { sub = path; path = key; } //move arguments
        let origin;
        if (!(parent instanceof RouteTree)) { origin = parent; parent = undefined; }

        super((keys, absolute=false)=>this.get(keys, absolute));

        solid.all(this, { parent, key, path });

        const _p = cached({}, {}, "index", _=>RouteTree.createIndex(this, sub));

        solid.all(this, {
            get:(keys, absolute=false)=>{
                const [ bite, rest ] = String.jet.bite(keys, "/");
                const cn = bite || rest;
                const child = _p.index[cn];
                if (!child) { throw Error(`Route ${cn} not found at ${key}`); }
                return bite ? child.get(rest, absolute) : absolute ? child.origin : child.fullpath;
            },
            forEach:(callback, deep=false)=>{
                for (let i in _p.index) {
                    const child = _p.index[i];
                    callback(child);
                    if (deep) { child.forEach(callback, deep); }
                }
            }

        }, false);

        virtual.all(this, {
            fullkey:_=>(parent?.fullkey ? parent.fullkey + "/" : "") + key,
            fullpath:_=>(parent ? parent.fullpath + "/" : "") + path,
            origin:_=>(origin ? origin : "") + (parent ? parent.origin + "/" : "") + path,
            list:_=>{
                let r = [];
                this.forEach(({fullpath})=>r.push(fullpath), true);
                return r;
            },
            index:_=>{
                let r = {};
                this.forEach(({fullkey, fullpath})=>r[fullkey] = fullpath, true);
                return r;
            }
        }, false);

    }
}


export const routeTree = (origin, sub)=>new RouteTree(origin, "", "", sub);
export default routeTree;