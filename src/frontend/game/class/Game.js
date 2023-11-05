import fe, { bridge, info } from "@randajan/simple-app/fe";

import jet from "@randajan/jet-react";
import { emit } from "../../config/io";
import { GameBoard } from "./GameBoard";

const { solid } = jet.prop;

export class Game {

    constructor() {
        solid.all(this, {
            board:new GameBoard(this)
        });
    }

    async connect(gameId, browserId) {
        return emit("gameConnect", { gameId, browserId });
    }

    async emit(event, data={}) {
        return emit(event, data);
    }
}