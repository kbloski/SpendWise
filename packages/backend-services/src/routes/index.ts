import { Express } from "express";
import authRoutes from './authRoutes'
import usersRoutes from './usersRoutes'
import budgetsRoutes from './budgetsRoutes'

const routes :  any[] = [
    authRoutes,
    usersRoutes,
    budgetsRoutes
]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;