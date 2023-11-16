import jet from "@randajan/jet-core";


const { solid } = jet.prop;

export class Shelly {

    constructor(username, password, url) {
        solid.all(this, {
            auth:'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
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