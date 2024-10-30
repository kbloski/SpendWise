import Category from "../models/CategoryModel";
import Expense from "../models/ExpenseModel";
import User from "../models/UserModel";
import CategoryType from "../types/CategoryType";
import ExpenseType from "../types/ExpenseType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";

export default class ExpenseController extends AbstractCrudController<Expense> {
    constructor() {
        super(Expense);
    }

    async create(data: Omit<ExpenseType, "id">): Promise<Expense | null> {
        return super.create(data);
    }

    async setCategory( expense : Expense | ExpenseType, category : Category | CategoryType ){
        const updated = this.updateById( expense.id, { category_id: category.id })
        return !!updated
    }

    async setUser( expense : Expense | ExpenseType, user : User | UserType ){
        const updated = this.updateById( expense.id, { user_id: user.id })
        return !!updated
    }

    async updateById(
        id: number,
        data: Partial<Omit<Expense, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
