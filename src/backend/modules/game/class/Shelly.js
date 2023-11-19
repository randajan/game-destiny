import jet from "@randajan/jet-core";
import fetch from "node-fetch";


const { solid } = jet.prop;

export class Shelly {

    constructor(username, password, url) {
        solid.all(this, {
            auth:'Basic ' + btoa(username + ":" + password),
            urls:Array.jet.to(url)
        });
    }

    async fetch(path, params) {
        const { urls, auth } = this;

        const opt = {
            method:params ? "POST" : "GET",
            headers:{ 'Authorization':auth }
        }

        const query = params ? "?" + new URLSearchParams(params) : "";
        const pathname = String.jet.to(path)+query;

        return Promise.all(urls.map(async url=>{
            const resp = await fetch(url+"/"+pathname, opt);
            return resp.json();
        }));

    }

    async get(path) {
        return this.fetch(path);
    }

    async set(path, params={}) {
        return this.fetch(path, params);
    }


}

const shelly = new Shelly("", "", [
    "http://10.10.3.54",
    "http://10.10.3.55",
    "http://10.10.3.56",
    "http://10.10.3.57"
]);

export const setRealLights = async power=>{
    const gain = Math.round(power*80);
    const mod = gain / 100;
    try { await shelly.set("color/0", {
        red:255*mod,
        green:148*mod,
        blue:34*(4 - 3*mod),
        gain,
        white:0,
        transition:500
    }); } catch(err) {

    }
}

export const setRealLightsEnd = async isWin=>{
    try {
        await shelly.set("color/0", {
            red:isWin?0:255,
            green:isWin?255:0,
            blue:0,
            gain:100,
            white:0,
            transition:3000
        });

        setTimeout(_=>setRealLights(1), 3000);
    } catch(err) {

    }
}