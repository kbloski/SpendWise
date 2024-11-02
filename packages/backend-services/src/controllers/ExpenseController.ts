import Category from "../models/CategoryModel";
import Expense from "../models/ExpenseModel";
import User from "../models/UserModel";
import CategoryType from "../types/CategoryType";
import ExpenseType from "../types/ExpenseType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { categoryController, userController } from "./controllers";

export default class ExpenseController extends AbstractCrudController<Expense> {
    constructor() {
        super(Expense);
    }

    async getCategoryExpenses(categoryId: number) {
        return await this.model.findAll({ where: { category_id: categoryId } });
    }

    async getTotalCategoryExpenses(categoryId: number) {
        try {
            return await this.model.sum( 'amount', {where: {category_id: categoryId}})
        } catch(err){
            console.error("Error calculating total expenses:", err);
            throw new Error("Failed to calculate total expenses"); //
        }
    }

    async create(data: Omit<ExpenseType, "id">): Promise<Expense | null> {
        try {
            const {category_id, user_id} = data
            const categoryDb = await categoryController.getById( category_id);
            if (!categoryDb) throw new Error("Category with id: " + category_id + ' not exist' )
            const userDb = await userController.getById( user_id);
            if (!userDb) throw new Error("User with id:" + user_id + " not exist")
            return await super.create(data);
        } catch (err){
            console.error(err)
            throw new Error("Failed create ExpenseController.create()")
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
