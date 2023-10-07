import sapp, { argv, envs } from "@randajan/simple-app";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';
import { sassPlugin } from 'esbuild-sass-plugin';

//those values are default values

const { home, title, slash, shelly } = envs();

sapp(argv.env === "prod", {
    port:3005,
    info:{
        home,
        title,
    },
    be:{
        info:{
            slash:slash || "/",
            shelly
        },
        plugins:[
            ImportGlobPlugin.default()
        ]
    },
    fe:{
        loader:{
            ".js":"jsx",
            '.png': 'file',
            ".jpg": "file",
            ".gif": "file",
            ".eot": "file",
            ".woff": "file",
            ".ttf": "file",
            ".svg": "file"
        },
        //entries:["index.jsx", "tools.js"],
        plugins:[
            ImportGlobPlugin.default(),
            sassPlugin()
        ]
    }
})