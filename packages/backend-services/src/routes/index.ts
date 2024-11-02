import { Express } from "express";
import authRoutes from './authRoutes'
import usersRoutes from './usersRoutes'
import budgetsRoutes from './budgetsRoutes'
import categoriesRoutes from './categoriesRoutes'

const routes :  any[] = [
    authRoutes,
    usersRoutes,
    budgetsRoutes,
    categoriesRoutes
]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;