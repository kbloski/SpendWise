import AbstractCrudController from "./AbstractCrudController";
import Report from "../models/ReportModel";
import ReportType from "../types/ReportType";
import Budget from "../models/BudgetModel";
import BudgetType from "../types/BudgetType";

export default class ReportController extends AbstractCrudController<Report> {
    constructor() {
        super(Report);
    }

    async create(data: Omit<ReportType, "id" | "budget_id">): Promise<Report | null> {
        return super.create(data);
    }

    async getByBudgetId(id: number) {
        return this.model.findAll({ where: { id } });
    }

    async setBudget( report : Report | ReportType, budget: Budget | BudgetType){
        const updated = this.updateById( report.id , { budget_id: budget.id})
        return !!updated
    }

    async updateById(
        id: number,
        data: Partial<Omit<ReportType, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
