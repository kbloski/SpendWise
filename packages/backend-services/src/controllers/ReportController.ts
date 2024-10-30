import AbstractCrudController from "./AbstractCrudController";
import Report from "../models/ReportModel";
import ReportType from "../types/ReportType";

export default class ReportController extends AbstractCrudController<Report> {
    constructor() {
        super(Report);
    }

    async create(data: Omit<ReportType, "id">): Promise<Report | null> {
        return super.create(data);
    }

    async getByBudgetId( id: number ){
        return this.model.findAll({where: {id}})
    }

    async updateById(id: number, data: ReportType): Promise<Boolean> {
        return super.updateById(id, data);
    }

}