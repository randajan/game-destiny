
import { forFiles, importFiles } from "../tools/importFiles";
import * as files from "./themes/**/*";

const _index = {};


forFiles(files, "./themes/", (pathname, exports)=>{
    const [ id, file ] = pathname.split(/[\/\.]/);
    const exp = exports.default;
    
    const theme = _index[id] || (_index[id] = {});
    
    if (file !== "index") { theme[file] = exp; }
    else { _index[id] = {...exp, ...theme}; }
});


export const themes = Object.values(_index);