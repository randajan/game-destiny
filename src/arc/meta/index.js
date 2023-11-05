import { importFiles } from "../tools/importFiles";
import * as files from "./ents/**";

export const ents = importFiles(files, "./ents/", ".js");
export default ents;