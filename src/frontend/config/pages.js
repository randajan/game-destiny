import React from "react";

import { Monitor } from "../pages/Monitor/Monitor";
import { E404 } from "../pages/E404/E404";
import { Node } from "../pages/Node/Node";
import { Mgmt } from "../pages/Mgmt/Mgmt";
import { LadingPage } from "../pages/LadingPage/LadingPage";
import { Game } from "../pages/Game/Game";




export const pages = [
  { id:"page-landingPage", title:"", path:"/", content:<LadingPage/> },
  { id:"page-game", title:"Game", path:"/game", content:<Game/> },
  { id:"page-node", title:"Node", path:"/node/:id", content:<Node/>},
  { id:"page-mgmt", title:"Mamagement", path:"/mgmt", content:<Mgmt/>, hidden:true },
  { id:"page-404", title:"404", path:"(.*)", content:<E404/>, hidden:true}
]