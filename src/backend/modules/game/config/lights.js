import info from "@randajan/simple-app/info";
import { Shelly } from "../../shelly/Shelly";

const { shelly } = info;
const realLights = new Shelly(shelly?.username, shelly?.password, shelly?.listRGBW);

export const setRealLights = async power=>{
    const pp = Math.round(power*80); 
    const gain = pp || 1;
    return realLights.set("color/0", {
        red:pp ? 255 : 0,
        green:pp ? 148 : 0,
        blue:pp ? 34 : 255,
        gain,
        white:0
    });
}

export const setRealLightsEnd = async isWin=>{
    await realLights.set("color/0", {
        red:isWin?0:255,
        green:isWin?255:0,
        blue:0,
        gain:80,
        white:0,
    });

    setTimeout(_=>setRealLights(1), 3000);
}