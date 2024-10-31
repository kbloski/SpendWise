import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import {
    budgetController,
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
import { sequelize } from "../utils/db";
import path from "path";
import fs from "fs";
import User from "../models/UserModel";
import Budget from "../models/BudgetModel";
import { Expense, syncDb } from "../models/schemas";

const pathFile = path.join(__dirname, "db_test.json");
const file = fs.readFileSync(pathFile, "utf-8");
const dataDb = JSON.parse(file);

syncDb();
load();

async function load() {
    const usersDb: any[] = [];

    // Usuwamy wszystkie dane przed dodaniem nowych
    await userController.deleteAll();
    await budgetController.deleteAll();
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
            });
            await budgetController.setOwner(
                b as any,
                { id: usersDb[budget.user_id - 1]?.id } as any
            );
            budgetsDb.push(b);
        } catch (error) {
            console.error(`Error creating budget: ${error}`);
        }
    }

    const categoriesDb: any[] = [];
    for (const category of dataDb.categories) {
        const c = await categoryController.create({
            name: category.name,
        } as any);
        categoryController.setBudget(
            c as any,
            {
                id: budgetsDb[category.budget_id - 1].id,
            } as any
        );
        categoriesDb.push(c);
    }

    for (const expense of dataDb.expenses) {
        const tmpCategoryId = expense.category_id;
        const tmpUserId = expense.user_id;

        delete expense.id;
        delete expense.category_id;
        delete expense.user_id;
        const e = await expenseController.create(expense as any);

        await expenseController.setCategory(
            e as Expense,
            {
                id: categoriesDb[tmpCategoryId - 1].id,
            } as any
        );

        await expenseController.setUser(
            e as any,
            { id: usersDb[tmpUserId - 1].id } as any
        );
    }

    for (const report of dataDb.reports) {
        const tmpBudgetId = report.budget_id;
        delete report.id;
        delete report.budget_id;
        const r = await reportController.create(report);
        reportController.setBudget(
            r as any,
            { id: budgetsDb[tmpBudgetId - 1].id } as any
        );
    }
}
