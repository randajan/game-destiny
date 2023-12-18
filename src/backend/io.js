import { io, bridge } from "@randajan/simple-app/be/koa";
import { channels } from "../arc/routes";

bridge.channelTranslate(ch=>channels(ch, true));
