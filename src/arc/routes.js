
import info from "@randajan/simple-app/info";
import jet from "@randajan/jet-core";
import routeTree from "./tools/RouteTree";


export const routes = routeTree(info.home.origin, add=>{
    
    add("odata", add=>{
        add("raws", { "**":":s*" })
        add("vals", { "**":":s*" })
        add("appsheet", { "**":":s*" })
    });


});


export const channels = routeTree(info.channelsOrigin, add=>{

    add("$$system");

    add("acc", [
        "signIn",
        "signUp",
        "signOut",
        "list"
    ]);

    add("game", [
        "create",
        "connect",
        "disconnect",
        "updateBoard",
        "updateState"
    ]);

});