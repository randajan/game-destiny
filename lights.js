import info from "@randajan/simple-app/info";
import { Shelly } from "./src/backend/modules/shelly/Shelly";

const { shelly } = info;
const realLights = new Shelly(shelly?.username, shelly?.password, shelly?.listRGBW);
const realVent = new Shelly(shelly?.username, shelly?.password, shelly?.vent);


export const setRealLights = async power=>{
    const gain = Math.round(power*80);
    const mod = gain / 100;
    try { await realLights.set("color/0", {
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
        await realLights.set("color/0", {
            red:isWin?0:255,
            green:isWin?255:0,
            blue:0,
            gain:80,
            white:0,
            transition:3000
        });

        setTimeout(_=>setRealLights(1), 3000);
    } catch(err) {

    }
}

export const setRealVent = async isOn=>realVent.set("relay/0", { turn:isOn ? "on" : "off" });


