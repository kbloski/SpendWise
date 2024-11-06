import { Op } from "sequelize";
import Budget from "../models/BudgetModel";
import Category from "../models/CategoryModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import CategoryType from "../types/CategoryType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController, expenseController } from "./controllers";
import { sequelize } from "../utils/db";

export default class CategoryController extends AbstractCrudController<Category> {
    constructor() {
        super(Category);
    }

    async create(data: Omit<CategoryType, "id">): Promise<Category | null> {
        try {
            const budgetExist = await budgetController.getById( data.budget_id )
            if (!budgetExist) throw new Error('Budget with id, ' + data.budget_id + ', not exist');
            return await super.create(data);
        } catch (err ) {
            console.error(err)
            throw new Error("Failed create CategoryController.create()");
        }
    }

    async isAccessibleCategoryForUser(
        category: CategoryType | Category,
        user: UserType | User
    ){
        const availableBudgets = await budgetController.getAccessibleBudgetsForUser( user.id);
        
        if (!availableBudgets?.length) return false;
        const budgetsIds = availableBudgets.map( v => v.id )
        const finded = await this.model.count(
            {
                where: {
                    id: category.id,
                    budget_id: { [Op.in] : [...budgetsIds]}
            }
        })
        return !!( finded )
    }

    async isAccessCategoryToBudget(category: Category | CategoryType, budget : Budget | BudgetType){
        return category.budget_id == budget.id
    }

    async getAllByBudgetId(budgetId: number) {
        return await this.getAll("ASC", "id", { budget_id: budgetId });
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

    async deleteById(id: number): Promise<Boolean> 
    {
        const transaction = await sequelize.transaction()
        try {
            await expenseController.deleteByCategoryId( id );
            const isDeleted =  await super.deleteById(id)    
            transaction.commit();
            return isDeleted;
        } catch (err){
            console.error(err)
            throw new Error("Failed delete category with id "+ id)
        }
    }


}
