import { Optional } from "sequelize";
import Budget from "../models/BudgetModel";
import BudgetShare from "../models/BudgetSharesModel";
import User from "../models/UserModel";
import BudgetShareType, { UserRoles } from "../types/BudgetShareType";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";

export default class BudgetSharesController extends AbstractCrudController<BudgetShare>
{
    constructor(){
        super(BudgetShare)
    }

    async create(data: Optional<BudgetShareType, "id" | "role" >): Promise<BudgetShare | null> {
         if (data.id) delete data.id;
         return await this.model.create({
            budget_id: data.budget_id,
            user_id: data.user_id,
            role: data.role ?? UserRoles.VIEWER
         } as BudgetShareType);
    }

    async updateById(id: number, data: Partial<Omit<BudgetShareType, "id">>): Promise<Boolean> {
        return await super.updateById( id , data)
    }

    async isUserBudgetRelated( user : UserType | User, budget : BudgetType | Budget){
        const counted = await this.model.count({ where : { user_id: user.id , budget_id: budget.id}})

        console.log( counted)
        if (!counted) return false;
        return true; 
    }
}