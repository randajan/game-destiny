import React from "react";

import { E404 } from "../pages/E404/E404";
import { LadingPage } from "../pages/LadingPage/LadingPage";
import { Game } from "../pages/Game/Game";
import { Lounge } from "../pages/Lounge/Lounge";




export const pages = [
  { id:"page-landingPage", title:"", path:"/", content:<LadingPage/> },
  { id:"page-lounge", title:"", path:"/lounge", content:<Lounge/> },
  { id:"page-game", title:"Game", path:"/game/:gameId", content:<Game/> },
  { id:"page-404", title:"404", path:"(.*)", content:<E404/>, hidden:true}
]