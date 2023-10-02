import jet from "@randajan/jet-core";
import { BaseAsync } from "@randajan/jet-base";


import { importFiles } from "../tools/importFiles";

import * as nodesConfigs from "./nodes/**";


const nodes = importFiles(nodesConfigs, "./nodes/", ".js");

export const nodesList = ["core", "battery", "shield", "oxygen", "ac", "navigation", "engine", "light"];
export const statsList = ["energy", "battery", "health", "oxygen", "heat", "direction", "distance"];

export const createGameBase = _=>new BaseAsync((base, opt)=>{

    for (const id of nodesList) {
        const node = nodes[id];
        const title = String.jet.to(node.title) || id;
        const onTick = jet.isRunnable(node.onTick) ? node.onTick : _=>{};
        const energyUse = Number.jet.frame(Number.jet.to(node.energyUse), 0, 1);
        const enthropy = Number.jet.frame(Number.jet.to(node.enthropy), 0, 1) || energyUse;

        base.fit(["ship.nodes", id], (next, f)=>{
            f = next(f);
            const v = Object.jet.tap(f);
            v.id = id;
            v.title = title,
            v.onTick = onTick;
            v.isOn = Boolean.jet.to(v.isOn);
            v.health = Number.jet.frame(Number.jet.to(v.health), 0, 1);
            v.powerSet = Number.jet.frame(Number.jet.to(v.powerSet), 0, 1);
    
            v.power = v.powerSet * v.health;
            v.energyUse = v.powerSet * energyUse;
            v.enthropy = v.powerSet * enthropy;
            
            return v;
        });

        base.set(["ship.nodes", id], {
            isOn:node.isOn != null ? node.isOn : true,
            health:node.health != null ? node.health : 1,
            powerSet:node.powerSet != null ? node.powerSet : .5,
            capacity:Number.jet.only(node.capacity)
        });

    }

    for (const id of statsList) {
        base.fit(["ship.stats", id], (next, f)=>{
            f = next(f);
            return Number.jet.round(Number.jet.frame(Number.jet.to(f), 0, 1), 4);
        });

        base.set(["ship.stats", id], 1);
    }

    base.fit("ship", (next, f)=>{
        f = next(f);
        const v = Object.jet.tap(f);
        const { stats:{ health, distance, oxygen, heat }, nodes:{core, battery} } = v;
        v.state = (!health || !oxygen || !heat) ? "death" : !distance ? "home" : core.isOn ? "power" : battery.isOn ? "battery" : "blackout";
        return v;
    });



});