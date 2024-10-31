import Budget from "../models/BudgetModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController } from "./controllers";

export default class BudgetController extends AbstractCrudController<Budget> {
    constructor() {
        super(Budget);
    }

    async getAllByUserId(userId: number) {
        return await this.getAll("DESC", "updatedAt", { user_id: userId });
    }

    async create(
        data: Omit<BudgetType, "id" | "user_id" | "createdAt" | "updatedAt">
    ): Promise<Budget | null> {
        return super.create(data);
    }

    async setOwner(budget: BudgetType | Budget, user: UserType | User) {
        const updated = await this.updateById(budget.id, { user_id: user.id });
        return !!updated; // Bool
    }
    
    
    async updateById(
        id: number,
        data: Partial<Omit<BudgetType, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
