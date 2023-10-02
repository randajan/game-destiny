import React from "react";
import { createRoot } from 'react-dom/client';

import fe, { bridge, info } from "@randajan/simple-app/fe";


import Modal from "@randajan/react-popup";
import "@randajan/react-popup/css";

import "./index.scss";

import { Background } from "./frames/Background/Background";


const root = document.getElementById("root");
//screen.watch("", _=>root.setAttribute("data-screen", screen.getList().join(" ")), true);

import { Monitor } from "./frames/Monitor/Monitor";

createRoot(root).render(
    <Modal className="App">
        <Background/>
        <nav><h1>Destiny</h1></nav>
        <Monitor/>
    </Modal>
);




