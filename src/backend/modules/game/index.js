import jet from "@randajan/jet-core";
import { GameProvider } from "./class/GameProvider";
import { gameConfig } from "./config";

const games = {};

export const loadGame = key=>games[key];

export const createGame = key=>{
    key = String.jet.to(key) || jet.uid(16);
    return games[key] = new GameProvider(key, gameConfig);
}

export const loadOrCreateGame = key=>loadGame(key) || createGame(key);
