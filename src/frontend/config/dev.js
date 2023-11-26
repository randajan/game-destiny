import page from "@randajan/jet-react/page";

import jet from "@randajan/jet-core";
import { game } from "../game";
import {  store } from "./bases";
import { account } from "./acc";


window.page = page;
window.game = game;
window.jet = jet;
window.store = store;
window.acc = account;