import Budget from "../models/BudgetModel";
import BudgetType from "../types/BudgetType";
import AbstractCrudController from "./AbstractCrudController";

export default class BudgetController extends AbstractCrudController<Budget> {
    constructor() {
        super(Budget);
    }

    async create(data: Omit<BudgetType, "id">): Promise<Budget | null> {
        return super.create(data);
    }

    async updateById(id: number, data: BudgetType): Promise<Boolean> {
        this.model.
        return super.updateById(id, data);
    }
}
