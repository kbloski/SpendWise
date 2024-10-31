import Budget from "../models/BudgetModel";
import Category from "../models/CategoryModel";
import BudgetType from "../types/BudgetType";
import CategoryType from "../types/CategoryType";
import { sendErrorResponse } from "../utils/responseUtils";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController } from "./controllers";

export default class CategoryController extends AbstractCrudController<Category> {
    constructor() {
        super(Category);
    }

    async create(data: Omit<CategoryType, "id">): Promise<Category | null> {
        return super.create(data);
    }

    async getAllByBudgetId( budgetId: number){
        return await this.getAll("ASC", "id", { budget_id: budgetId})
    }

    async setBudget(
        category: CategoryType | Category,
        budget: BudgetType | Budget
    ) {
        const updated = this.updateById(category.id, { budget_id: budget.id });
        return !!updated;
    }

    async updateById(
        id: number,
        data: Partial<Omit<CategoryType, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
