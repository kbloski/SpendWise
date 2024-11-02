import { Op, Optional } from "sequelize";
import Category from "../models/CategoryModel";
import Expense from "../models/ExpenseModel";
import User from "../models/UserModel";
import CategoryType from "../types/CategoryType";
import ExpenseType from "../types/ExpenseType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { categoryController, userController } from "./controllers";
import BudgetType from "../types/BudgetType";
import Budget from "../models/BudgetModel";

export default class ExpenseController extends AbstractCrudController<Expense> {
    constructor() {
        super(Expense);
    }

    async getCategoryExpenses(categoryId: number) {
        return await this.model.findAll({ where: { category_id: categoryId } });
    }

    async getAllforBudget(budget: BudgetType | Budget) {
        const budgetCategories = await categoryController.getAllByBudgetId(
            budget.id
        );

        if (!budgetCategories) return [];

        const categoriesIds = budgetCategories.map((cat) => cat.id);
        return this.model.findAll({
            where: {
                category_id: {
                    [Op.in]: categoriesIds,
                },
            },
        });
    }

    async getTotalCategoryExpenses(categoryId: number) {
        try {
            return await this.model.sum("amount", {
                where: { category_id: categoryId },
            });
        } catch (err) {
            console.error("Error calculating total expenses:", err);
            throw new Error("Failed to calculate total expenses"); //
        }
    }

    async isAccessForUser( 
        expense: ExpenseType | Expense,
        user: UserType | User,
    ){
        try {
            const expenseDb = await this.model.findByPk( expense.id );
            if (!expenseDb) throw new Error("Not find expense in database");

            const categoryDb = await categoryController.getById( expenseDb.category_id);
            if (!categoryDb) throw new Error("not find category in database");
            
            return await categoryController.isAccessibleCategoryForUser(categoryDb, user);
        } catch (err){
            console.error(err);
            throw new Error("Failed check access in ExpenseController.isAccessForUser()")
        }
    }

    async create(
        data: Optional<Omit<ExpenseType, "id">, "date">
    ): Promise<Expense | null> {
        try {
            const { category_id, user_id } = data;
            const categoryDb = await categoryController.getById(category_id);
            if (!categoryDb)
                throw new Error(
                    "Category with id: " + category_id + " not exist"
                );
            const userDb = await userController.getById(user_id);
            if (!userDb)
                throw new Error("User with id:" + user_id + " not exist");
            return await super.create(data);
        } catch (err) {
            console.error(err);
            throw new Error("Failed create ExpenseController.create()");
        }
    }

    async setCategory(
        expense: Expense | ExpenseType,
        category: Category | CategoryType
    ) {
        const updated = this.updateById(expense.id, {
            category_id: category.id,
        });
        return !!updated;
    }

    async setUser(expense: Expense | ExpenseType, user: User | UserType) {
        const updated = this.updateById(expense.id, { user_id: user.id });
        return !!updated;
    }

    async updateById(
        id: number,
        data: Partial<Omit<Expense, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
