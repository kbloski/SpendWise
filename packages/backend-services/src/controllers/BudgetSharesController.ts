import Budget from "../models/BudgetModel";
import BudgetShare from "../models/BudgetSharesModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";

export default class BudgetSharesController extends AbstractCrudController<BudgetShare>
{
    constructor(){
        super(BudgetShare)
    }

    async isUserBudgetRelated( user : UserType | User, budget : BudgetType | Budget){
        const counted = this.model.count({ where : { user_id: user.id , budget_id: budget.id}})
        if (!counted) return false;
        return true; 
    }
}