import sapp, { argv, envs } from "@randajan/simple-app";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';
import { sassPlugin } from 'esbuild-sass-plugin';
import jet from "@randajan/jet-core";

//those values are default values

const { home, title, slash, port } = envs();

sapp(argv.env === "prod", {
    port,
    info:{
        home,
        title,
        channelsOrigin:jet.uid(12)
    },
    be:{
        info:{
            slash:slash || "/"
        },
        external:["co-body", "raw-body", "inflation"],
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