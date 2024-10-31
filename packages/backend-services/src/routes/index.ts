import { Express } from "express";
import authRoutes from './authRoutes'
import usersRoutes from './usersRoutes'

const routes :  any[] = [
    authRoutes,
    usersRoutes
]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;