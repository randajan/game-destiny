import React from "react";
import { createRoot } from 'react-dom/client';

import fe, { bridge, info } from "@randajan/simple-app/fe";


import Modal from "@randajan/react-popup";
import "@randajan/react-popup/css";

import "./index.scss";

//import { screen } from "./config/base";


const root = document.getElementById("root");
//screen.watch("", _=>root.setAttribute("data-screen", screen.getList().join(" ")), true);

import "./config/game";
import { Monitor } from "./frames/Monitor/Monitor";

createRoot(root).render(
    <Modal className="App">
        <nav></nav>
        <Monitor/>
    </Modal>
);



