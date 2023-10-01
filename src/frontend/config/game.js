import fe, { bridge, info } from "@randajan/simple-app/fe";

import { BaseSync } from "@randajan/jet-base";

export const game = new BaseSync();
export default game;

bridge.socket.on("game-tick", (currentState)=>{
    game.set(JSON.parse(currentState));
});





