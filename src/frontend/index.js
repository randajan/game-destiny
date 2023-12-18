import React from "react";
import { createRoot } from 'react-dom/client';

import fe, { bridge, info } from "@randajan/simple-app/fe";
import "./config/io";
import "./config/dev";

import { Modal } from "@randajan/react-form";
import '@randajan/react-form/css';

import "./styles/*";

import Background from "./frames/Background/Background";
import { HeadPane } from "./frames/HeadPane/HeadPane";

import screen from "@randajan/jet-react/screen";
import Hull from "./frames/Hull/Hull";

const root = document.getElementById("root");
screen.watch("", _=>root.setAttribute("data-screen", screen.getList().join(" ")), true);

createRoot(root).render(
    <Modal className="App">
        <Background/>
        <HeadPane/>
        <Hull/>
    </Modal>
);
