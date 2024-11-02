import { Express } from "express";
import authRoutes from './authRoutes'
import usersRoutes from './usersRoutes'
import budgetsRoutes from './budgetsRoutes'
import categoriesRoutes from './categoriesRoutes'
import expensesRoutes from './expensesRoutes'

const routes :  any[] = [
    authRoutes,
    usersRoutes,
    budgetsRoutes,
    categoriesRoutes,
    expensesRoutes
]


function registerRoutes( app: Express ){
    for( const r of routes){
        app.use( r )
    }
}

export default registerRoutes;