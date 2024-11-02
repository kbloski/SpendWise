import AbstractCrudController from "./AbstractCrudController";
import Report from "../models/ReportModel";
import ReportType from "../types/ReportType";
import Budget from "../models/BudgetModel";
import BudgetType from "../types/BudgetType";
import { budgetController } from "./controllers";

export default class ReportController extends AbstractCrudController<Report> {
    constructor() {
        super(Report);
    }

    async create(
        data: Omit<ReportType, "id">
    ): Promise<Report | null> {
        try {
            const {budget_id} = data
            const budgetDb = await budgetController.getById( budget_id) ;
            if (!budgetDb) throw new Error("Budget with id: " + budget_id + ' not exist')
            return await super.create(data);
        } catch(err){
            console.error(err)
            throw new Error("Failed create ReportController.create()")
        }
    }

    async getByBudgetId(id: number) {
        return this.model.findAll({ where: { id } });
    }

    async setBudget(report: Report | ReportType, budget: Budget | BudgetType) {
        const updated = this.updateById(report.id, { budget_id: budget.id });
        return !!updated;
    }

    async updateById(
        id: number,
        data: Partial<Omit<ReportType, "id">>
    ): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
