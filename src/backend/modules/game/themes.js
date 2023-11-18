
import { forFiles, importFiles } from "../../../arc/tools/importFiles";
import * as files from "./themes/**/*";

export const themesIndex = {};


forFiles(files, "./themes/", (pathname, exports)=>{
    const [ id, file ] = pathname.split(/[\/\.]/);
    const exp = exports.default;
    
    const theme = themesIndex[id] || (themesIndex[id] = {});
    
    if (file !== "index") { theme[file] = exp; }
    else { themesIndex[id] = {...exp, ...theme}; }
});

export const themes = Object.values(themesIndex);