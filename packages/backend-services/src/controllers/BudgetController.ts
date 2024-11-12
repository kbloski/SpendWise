import { Op } from "sequelize";
import Budget from "../models/BudgetModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import {
    budgetSharesController,
    categoryController,
    expenseController,
    reportController,
    userController,
} from "./controllers";
import { sequelize } from "../utils/db";
import { UserRoles } from "../types/BudgetShareType";

export default class BudgetController extends AbstractCrudController<Budget> {
    constructor() 
    {
        super(Budget);
    }

    async getTotalBudgetCategoryExpenses(budget: BudgetType) {
        let totalExpenses = 0;
        const budgetCategories = await categoryController.getAllByBudgetId( budget.id );
        if (!budgetCategories) return totalExpenses;
        for (const category of budgetCategories) 
        {
            totalExpenses += await expenseController.getTotalCategoryExpenses( category.id);
        }
        return totalExpenses;
    }

    async getAccessibleBudgetsForUser(userId: number) {
        const allRelations = await budgetSharesController.getAllforUser(userId);
        if (!allRelations) return [];

        const budgetsIds = allRelations.map( r => r.budget_id);
        
        return await this.model.findAll({where: 
            {
                id: { [Op.in]: budgetsIds },
            },
        });
    }

    async getAllForOwner(ownerId: number) {
        return await this.getAll("DESC", "updatedAt", { user_id: ownerId });
    }

    async create(
        data: Omit<BudgetType, "id" | "createdAt" | "updatedAt">
    ): Promise<Budget | null> {
        const transaction = await sequelize.transaction();
        try {
            const userDb = await userController.getById(data.user_id);
            if (!userDb) throw new Error("User don't exits");

            const newBudget = await super.create(data);
            if (!newBudget) throw new Error("Cannot create budget");

            await budgetSharesController.findOrCreate({
                user_id: userDb.id,
                budget_id: newBudget.id
            })

            const createdRelation = this.setOwner(newBudget, userDb);
            if (!createdRelation) throw new Error("Not created budget relation");

            transaction.commit();
            return newBudget;
        } catch (err) {
            transaction.rollback();
            console.error(err)
            throw new Error("Failed BudgetController.create()");
        }
    }

    async setOwner(budget: BudgetType | Budget, user: UserType | User) {
        const transaction = await sequelize.transaction()
        try {
            const budgetDb = await this.getById(budget.id);
            if (!budgetDb) throw new Error("Budget don't exits");
            const userDb = await userController.getById(user.id);
            if (!userDb) throw new Error("User dont exis't in db");

            // delete old owner relation
            if (budgetDb.user_id !== user.id){
                const oldOwnerRelationId = await budgetSharesController.getIdUserBudgetRelation(
                    budgetDb.id, budgetDb.user_id )
                if (oldOwnerRelationId) await budgetSharesController.deleteById( oldOwnerRelationId )
            }

            // set new owner relation and change user_id in budget
            const relatedId = await budgetSharesController.
            getIdUserBudgetRelation(budgetDb.id, budget.user_id )

            let result = null;
            if (relatedId){ // update user relation if exist
                const isUpdateBudgetShare = 
                    await budgetSharesController.updateById(relatedId, {
                        user_id: userDb.id, role: UserRoles.ADMIN });

                const isUpdateBudget = await this.model.update(
                    { user_id: userDb.id}, { where: { id: budget.id} })

                result = isUpdateBudgetShare || isUpdateBudget;
            } else { // create new relaction
                const isCratedBudgetShare = await budgetSharesController.findOrCreate(
                    {
                        user_id: userDb.id,
                        budget_id: budgetDb.id,
                        role: UserRoles.ADMIN
                    });
                const isUpdateBudget = await this.model.update(
                    { user_id: userDb.id}, {where: { id: budget.id}})
                result = isCratedBudgetShare || isUpdateBudget
            }

            transaction.commit()
            return !!result;
        } catch (err) {
            transaction.rollback()
            console.error(err)
            throw new Error("Failed budgetController.setOwner()");
        }
    }

    async updateById(
        id: number,
        data: Partial<Omit<BudgetType, "id">>
    ): Promise<Boolean> {
        let isUpdated = false;
        const budgetDb = await this.getById(id);
        if (!budgetDb) return isUpdated;

        if (data.user_id) {
            const userDb = await userController.getById(data.user_id);
            if (userDb) isUpdated = await this.setOwner(budgetDb, userDb)
            delete data.user_id;
        }
        return super.updateById(id, data) || !!isUpdated;
    }

    async deleteById(id: number): Promise<Boolean> {
        const transaction = await sequelize.transaction()
        try {
            // Delete all categories for budget
            await reportController.deleteByBudgetId( id );
            await categoryController.deleteAllForBudget( id )
            await budgetSharesController.deleteWhere({budget_id: id})

            const isDeleted = super.deleteById(id)

            transaction.commit()
            return isDeleted;
        } catch (err){
            transaction.rollback()
            console.error(err)
            throw new Error("Failed deleted by BudgetController.deleteById()")
        }
    }
}
