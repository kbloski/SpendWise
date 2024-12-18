import { Express } from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import budgetsRoutes from "./budgetsRoutes";
import budgetSharesRoutes from "./budgetSharesRoutes";
import categoriesRoutes from "./categoriesRoutes";
import expensesRoutes from "./expensesRoutes";
import reportsRoutes from './reportsRoutes'
import rolesRoutes from './rolesRoutes'

const routes: any[] = [
    authRoutes,
    usersRoutes,
    budgetsRoutes,
    categoriesRoutes,
    expensesRoutes,
    budgetSharesRoutes,
    reportsRoutes,
    rolesRoutes
];

function registerRoutes(app: Express) {
    for (const r of routes) {
        app.use(r);
    }
}

export default registerRoutes;
