
import info from "@randajan/simple-app/info";

import routeTree from "./tools/RouteTree";

export const routes = routeTree(info.home.origin, add=>{
    
    add("odata", add=>{
        add("raws", { "**":":s*" })
        add("vals", { "**":":s*" })
        add("appsheet", { "**":":s*" })
    });


});

export const channels = routeTree("", add=>{

    add("acc", [
        "signIn",
        "signUp",
        "signOut",
        "update"
    ]);

    add("game", [
        "connect",
        "disconnect",
        "updateBoard",
        "updateState"
    ]);

});