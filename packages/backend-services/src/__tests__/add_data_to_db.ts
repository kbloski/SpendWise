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
import { connectDb, sequelize } from "../utils/db";
import path from "path";
import fs from "fs";
import { syncDb } from "../models/schemas";

const pathFile = path.join(__dirname, "db_test.json");
const file = fs.readFileSync(pathFile, "utf-8");
const dataDb = JSON.parse(file);


init()

async function init(){
    connectDb()
    await syncDb()
    await load();
}

async function load() {
    const usersDb: any[] = [];
    const trans =  await sequelize.transaction()
    try {
        // Dodajemy użytkowników do bazy danych
        for (const user of dataDb.users) {
            try {
                const u = await userController.create({
                    username: user.username,
                    email: user.email,
                    password: user.password
                });
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
                console.group( '-------------------', usersDb[budget.user_id-1].id)
                console.error(`Error creating budget: ${error}`);
            }
        }
    
        console.log('------------checkpoitn-categories--------')
        const categoriesDb: any[] = [];
        for (const category of dataDb.categories) {
            const c = await categoryController.create({
                name: category.name,
                budget_id: budgetsDb[ category.budget_id -1 ].id
            });
            categoriesDb.push(c);
        }
        
        console.log('------------checkpoitn-expense--------')
        for (const expense of dataDb.expenses) {
            delete expense.id;
            const e = await expenseController.create({
                ...expense,
                category_id: categoriesDb[expense.category_id-1].id,
                user_id: usersDb[ expense.user_id - 1].id
            });
        }
        
        console.log('------------checkpoitn-reports--------')
        for (const report of dataDb.reports) {
            const r = await reportController.create({
                ...report,
                budget_id: budgetsDb[ report.budget_id -1].id
            });
        }
    

        trans.commit
    } catch (err){
        // @ts-ignore
        console.error( err.message )
        trans.rollback()
    }
}
