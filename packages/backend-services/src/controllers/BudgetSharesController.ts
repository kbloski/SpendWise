import { Op, Optional } from "sequelize";
import Budget from "../models/BudgetModel";
import BudgetShare from "../models/BudgetSharesModel";
import User from "../models/UserModel";
import BudgetShareType, { UserRoles } from "../types/BudgetShareType";
import BudgetType from "../types/BudgetType";
import UserType from "../types/UserType";
import AbstractCrudController from "./AbstractCrudController";
import { budgetController, userController } from "./controllers";
import { sequelize } from "../utils/db";

export default class BudgetSharesController extends AbstractCrudController<BudgetShare> {
    // I need more information, and i cannot use through relation in schema
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

    // CHANGE ON - createIfNotExist()
    async findOrCreate(
        data: Optional<BudgetShareType, "id" | "role">
    ): Promise<BudgetShare | null> {
        try {
            const { user_id, budget_id } = data;
            const userExist = await userController.getById(user_id);
            if (!userExist)
                throw new Error("User with id: " + user_id + " not exist");
            const budgetExist = await budgetController.getById(budget_id);
            if (!budgetExist)
                throw new Error("Budget with id: " + budget_id + " not exist");

            const idExist = await this.getIdUserBudgetRelation(
                budgetExist.id,
                userExist.id
            );
            if (idExist) return await this.getById(idExist);

            return await super.create({
                user_id: data.user_id,
                budget_id: data.budget_id,
                role: data.role,
            });
        } catch (err) {
            console.error(err);
            throw new Error("Failed create BudgetShareType.create()");
        }
    }

    async getAccessibleWithBudgetForUser(userId: number) {
        const allRelations = await this.model.findAll({
            include: {
                model: Budget,
                required: true,
            },
            where: {
                user_id: userId,
            },
        });

        const dataToSend = allRelations.map((r) => {
            const data: any = r.dataValues;
            delete data.budget_id;
            delete data.user_id;
        });
        return allRelations;
    }

    async getAllUsersforBudget(budget: BudgetType | Budget) {
        const budgetShares = await this.model.findAll({
            where: { budget_id: budget.id },
        });

        const usersIds = budgetShares.map((bs) => bs.user_id);
        if (!usersIds.length) return [];

        return userController.getAll("ASC", "id", {
            id: { [Op.in]: usersIds },
        });
    }

    async getAllforUser(userId: number) {
        return await this.getAll("DESC", "id", { user_id: userId });
    }

    async updateById(
        id: number,
        data: Partial<Omit<BudgetShare, "id">>
    ): Promise<Boolean> {
        if (data.role === 0){
            const transaction = await sequelize.transaction()
            try {
                const updated = await super.updateById(id, data);

                const relation = await this.getById( id );
                if (!relation) throw new Error('Relation not exits')
                    
                const budgetDb = await budgetController.getById( relation.budget_id );
                if (!budgetDb) throw new Error("Budget not exist in database")
                const userDb = await userController.getById( relation.user_id);
                if (!userDb) throw new Error("User not exist in database")

                budgetController.setOwner(budgetDb, userDb )
                    
                transaction.commit()
                return updated
            } catch (err){
                transaction.rollback()
                console.error(err)
                throw new Error("Failed update budget share in BudgetShraresController.updateById()");
            }
        } else {
            return await super.updateById(id, data);
        }
    }

    async getIdUserBudgetRelation(budgetId: number, userId: number) {
        const relation = await this.model.findOne({
            where: { user_id: userId, budget_id: budgetId },
        });
        if (!relation) return null;
        return relation.id;
    }

    async getRelationByUserAndBudget(
        budgetId: number, 
        userId: number
    ) {
        const relation = await this.model.findOne({
            where: { user_id: userId, budget_id: budgetId },
        });
        return relation;
    }

    async isAccessUserToBudget(
        budget: BudgetType | Budget,
        user: UserType | User
    ) {
        const result = await this.getIdUserBudgetRelation(budget.id, user.id);
        return !!result;
    }

    async isAccessUserToBudgetToModify(
        budget: BudgetType | Budget,
        user: UserType | User
    ) {
        const id = await this.getIdUserBudgetRelation(budget.id, user.id);
        if (!id) return false;

        const relation = await this.getById(id);
        if (!relation) return false;

        const result =
            relation.role === UserRoles.ADMIN ||
            relation.role === UserRoles.EDITOR;
        return !!result;
    }

    async isAccessUserToBudgetByAdminRole(
        budget: BudgetType | Budget,
        user: UserType | User
    ) {
        const id = await this.getIdUserBudgetRelation(budget.id, user.id);
        if (!id) return false;

        const relation = await this.getById(id);
        if (!relation) return false;

        const result = relation.role === UserRoles.ADMIN;
        return !!result;
    }

    async deleteWhere(where: { user_id?: number; budget_id?: number }) {
        try {
            if (where.user_id)
                this.model.destroy({ where: { user_id: where.user_id } });
            if (where.budget_id)
                this.model.destroy({ where: { budget_id: where.budget_id } });
            return true;
        } catch (err) {
            console.error(err);
            throw new Error("Failed BudgetSharesController.deleteWher() ");
        }
    }
}
