import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import {
    budgetController,
    budgetSharesController,
    categoryController,
    expenseController,
    reportController,
    userController,
} from "../controllers/controllers";
import BudgetShare from "../models/BudgetSharesModel";
import BudgetShareType, { UserRoles } from "../types/BudgetShareType";
import BudgetType from "../types/BudgetType";
import CategoryType from "../types/CategoryType";
import ExpenseType from "../types/ExpenseType";
import ReportType from "../types/ReportType";
import UserType from "../types/UserType";
import { connectDb, sequelize } from "../utils/db";
import path from "path";
import fs from "fs";
import User from "../models/UserModel";
import Budget from "../models/BudgetModel";
import { Expense, syncDb } from "../models/schemas";
import Roles from "../enum/RolesEnum";
import { Sequelize } from "sequelize";

const pathFile = path.join(__dirname, "db_test.json");
const file = fs.readFileSync(pathFile, "utf-8");
const dataDb = JSON.parse(file);

connectDb()
syncDb();
load();

async function load() {
    const usersDb: any[] = [];
    const trans =  await sequelize.transaction()
    try {

        // Usuwamy wszystkie dane przed dodaniem nowych
        await userController.deleteAll();
        await budgetController.deleteAll();
        await budgetSharesController.deleteAll()
        await categoryController.deleteAll();
        await expenseController.deleteAll();
        await reportController.deleteAll();
    
        // Dodajemy użytkowników do bazy danych
        for (const user of dataDb.users) {
            try {
                const u = await userController.create(user);
                usersDb.push(u);
            } catch (error) {
                console.error(`Error creating user: ${error}`);
            }
        }
    
        // Dodajemy budżety do bazy danych
        const budgetsDb: any[] = [];
        for (const budget of dataDb.budgets) {
            try {
                const b = await budgetController.create({
                    name: budget.name,
                    user_id: usersDb[budget.user_id - 1]?.id,
                });
                budgetsDb.push(b);
            } catch (error) {
                console.error(`Error creating budget: ${error}`);
            }
        }
    
        const categoriesDb: any[] = [];
        for (const category of dataDb.categories) {
            const c = await categoryController.create({
                name: category.name,
                budget_id: budgetsDb[ category.budget_id -1].id
            });
            categoriesDb.push(c);
        }
    
        for (const expense of dataDb.expenses) {
            delete expense.id;
            const e = await expenseController.create({
                ...expense,
                category_id: categoriesDb[expense.category_id-1].id,
                user_id: usersDb[ expense.user_id - 1].id
            });
        }
    
        for (const report of dataDb.reports) {
            const r = await reportController.create({
                ...report,
                budget_id: budgetsDb[ report.budget_id -1].id
            });
        }
    
        for (const bs of dataDb.budgetShares){
            const newBs = {
                budget_id: budgetsDb[ bs.budget_id - 1].id,
                user_id: usersDb[ bs.user_id -1].id,
                role: UserRoles.VIEWER
            } 
            if (bs.role === "ADMIN") newBs.role = UserRoles.ADMIN
            if (bs.role === "EDITOR") newBs.role = UserRoles.EDITOR


            await budgetSharesController.create( newBs )
      
        } 

        trans.commit
    } catch (err){
        // @ts-ignore
        console.error( err.message )
        trans.rollback()
    }
}
