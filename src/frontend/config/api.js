import jet from "@randajan/jet-core";


export const apiFetch = async (src, body, method, cache="default")=>{
    const opt = {
        method:String.jet.only(method, body ? "POST" : "GET"),
        cache:String.jet.only(!Boolean.jet.is(cache) ? "default" : cache ? "force-cache" : "no-cache"),
        body
    }

    if (body) { opt.headers = { "Content-Type": "application/json" }}

    const resp = await fetch("/api/"+src, opt);
    return jet.json.from(await resp.text());
}

export const apiGet = async (src, cache="default")=>apiFetch(src, null, null, cache);