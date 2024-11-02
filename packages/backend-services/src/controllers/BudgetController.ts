import { Op, Optional } from "sequelize";
import Budget from "../models/BudgetModel";
import User from "../models/UserModel";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import {
    budgetSharesController,
    categoryController,
    expenseController,
    userController,
} from "./controllers";
import { sequelize } from "../utils/db";

export default class BudgetController extends AbstractCrudController<Budget> {
    constructor() {
        super(Budget);
    }

    async getTotalBudgetCategoryExpenses(budget: BudgetType) {
        let totalExpenses = 0;
        const budgetCategories = await categoryController.getAllByBudgetId(
            budget.id
        );
        if (!budgetCategories) return totalExpenses;
        for (const category of budgetCategories) {
            totalExpenses += await expenseController.getTotalCategoryExpenses(
                category.id
            );
        }
        return totalExpenses;
    }

    async getAccessibleBudgetsForUser(userId: number) {
        const allRelations = await budgetSharesController.getAllforUser(userId);
        if (!allRelations) return null;
        const budgetsIds: number[] = [];

        allRelations.forEach((r) => budgetsIds.push(r.budget_id));

        return await this.model.findAll({
            where: {
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
        const transaction = await sequelize.transaction()
        try {
            const userDb = await userController.getById( data.user_id);
            if (!userDb) throw new Error("User don't exits")
            const newBudget = await super.create(data);
            if (!newBudget) throw new Error("Cannot create budget")

            const createdRelation = this.setOwner( newBudget, userDb)
            if (!createdRelation) throw new Error('Not created budget relation')
            transaction.commit()
            return newBudget;
        } catch ( err ){
            transaction.rollback()
            throw new Error("Failed budgetController.create()")
        }
    }

    async setOwner(budget: BudgetType | Budget, user: UserType | User) {
        try {
            const budgetDb = await this.getById(budget.id);
            if (!budgetDb) throw new Error("Budget don't exits");
            const userDb = await userController.getById( user.id )
            if (!userDb) throw new Error("User dont exis't in db")

            const budgetShare = await budgetSharesController.create({
                user_id: userDb.id,
                budget_id: budgetDb.id,
            });
            return !!budgetShare;
        } catch (err) {
            // console.error(err)
            throw new Error("Failed budgetController.setOwner()");
        }
    }

    async updateById(
        id: number,
        data: Partial<Omit<BudgetType, "id">>
    ): Promise<Boolean> {
        const isUpdated = false;
        const budgetDb = await this.getById(id);

        if (!budgetDb) return isUpdated;
        if (data.user_id) {
            const userDb = await userController.getById(data.user_id);
            if (userDb) {
                this.setOwner(budgetDb, userDb);
                isUpdated;
            }
        }
        delete data.user_id;
        return super.updateById(id, data) || isUpdated;
    }
}
