import React from "react";

import { Monitor } from "../pages/Monitor/Monitor";
import { E404 } from "../pages/E404/E404";
import { NodeControl } from "../pages/NodeControl/NodeControl";


export const pages = [
  { id:"page-monitor", path:"/", content:<Monitor/> },
  { id:"page-node", path:"/node/:id", content:<NodeControl/> },
//   { id:"page-pricelist", path:rt.pricelist, content:<Pricelist/> },
//   { id:"page-about", path:rt.about, content:<About/> },

  { id:"page-404", path:"(.*)", content:<E404/>, hidden:true}
]