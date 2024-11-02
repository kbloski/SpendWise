import AbstractCrudController from "./AbstractCrudController";
import Report from "../models/ReportModel";
import ReportType from "../types/ReportType";
import Budget from "../models/BudgetModel";
import BudgetType from "../types/BudgetType";
import { budgetController, expenseController } from "./controllers";
import { Optional } from "sequelize";

export default class ReportController extends AbstractCrudController<Report> {
    constructor() {
        super(Report);
    }

    async create(
        data: Optional<
            Omit<ReportType, "id" | "createdAt">,
            "total_expenses" | "period_start" | "period_end"
        >
    ): Promise<Report | null> {
        try {
            const { budget_id } = data;
            const budgetDb = await budgetController.getById(budget_id);
            if (!budgetDb) throw new Error("Budget with id " + budget_id + " not exist");

            data.total_expenses = await expenseController.getTotalForBudget(
                budgetDb, 
                {
                    start_date: data.period_start,
                    end_date: data.period_end
                }
            );

            if (!data.total_expenses) data.total_expenses = 0;
            return await super.create(data);
        } catch (err) {
            console.error(err);
            throw new Error("Failed create ReportController.create()");
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

    async deleteByBudgetId(budgetId: number) {
        try {
            return this.model.destroy({where: {
                budget_id: budgetId
            }})
        } catch (err) {
            console.error(err);
            throw new Error("Failed ReportControllers.deleteByBudgetId()");
        }
    }
}
