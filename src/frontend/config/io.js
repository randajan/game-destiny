import { bridge } from "@randajan/simple-app/fe";
import { channels } from "../../arc/routes";


bridge.channelTranslate(ch=>channels(ch, true));

