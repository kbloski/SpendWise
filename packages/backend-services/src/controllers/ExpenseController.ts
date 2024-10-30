import Expense from "../models/ExpenseModel";
import ExpenseType from "../types/ExpenseType";
import AbstractCrudController from "./AbstractCrudController";

export default class ExpenseController extends AbstractCrudController<Expense> {
    constructor() {
        super(Expense);
    }

    async create(data: Omit<ExpenseType, "id">): Promise<Expense | null> {
        return super.create(data);
    }

    async updateById(id: number, data: ExpenseType): Promise<Boolean> {
        return super.updateById(id, data);
    }
}