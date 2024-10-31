import { Optional } from "sequelize";
import Budget from "../models/BudgetModel";
import BudgetShare from "../models/BudgetSharesModel";
import User from "../models/UserModel";
import BudgetShareType, { UserRoles } from "../types/BudgetShareType";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController, userController } from "./controllers";

export default class BudgetSharesController extends AbstractCrudController<BudgetShare> {
    // I need more information, and i cannot use through relation in schema
    // 
    // async setBudgetUserRelation(  budget user ){
    //     const budgetDb = await budgetController.getById(budget.id);
    //     const userDb = await userController.getById(user.id);
    //     if (!budgetDb || !userDb) return;
    //     // @ts-ignore
    //     budgetDb.addUser(userDb);
    // }

    constructor() {
        super(BudgetShare);
    }

    async create(
        data: Optional<BudgetShareType, "id" | "role">): Promise<BudgetShare | null> {
        const userExist = await userController.getById( data.user_id )
        if (!userExist) return null;
        const budgetExist =  await budgetController.getById( data.budget_id )
        if (!budgetExist) return null;


        const idExist = await this.getIdUserBudgetRelation( budgetExist, userExist);
        if (idExist) return await this.getById(idExist);
            
        return super.create({
            user_id: data.user_id,
            budget_id: data.budget_id,
            role: data.role
        } as any)        
    }

    async getAllforUser( userId: number){
        return await this.getAll("DESC", "id", { user_id: userId})
    }

    async updateById(
        id: number, 
        data: Partial<Omit<BudgetShare, "id">>): Promise<Boolean> 
    {
        return await super.updateById( id , data)
    }

    async getIdUserBudgetRelation( 
        budget: BudgetType | Budget,
        user: UserType | User,
    ){
        const relation = await this.model.findOne({where: { user_id: user.id , budget_id: budget.id}})
        if (!relation) return null;
        return relation.id
    }
    
    isAccessUserToBudget(
        budget: BudgetType | Budget,
        user: UserType | User,
    ){
        return !!this.getIdUserBudgetRelation( budget, user)
    }
}
