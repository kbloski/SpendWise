import Budget from "../models/BudgetShares";
import Category from "../models/CategoryModel";
import BudgetType from "../types/BudgetType";
import CategoryType from "../types/CategoryType";
import AbstractCrudController from "./AbstractCrudController";

export default class CategoryController extends AbstractCrudController<Category> {
    constructor() {
        super(Category);
    }

    async create(data: Omit<CategoryType, "id">): Promise<Category | null> {
        return super.create(data);
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
