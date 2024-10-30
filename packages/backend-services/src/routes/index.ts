import { Express } from "express";
import authRoutes from './authRoutes'

const routes :  any[] = [
    authRoutes
]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;