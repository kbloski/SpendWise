import { Express } from "express";

const routes :  any[] = [

]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;