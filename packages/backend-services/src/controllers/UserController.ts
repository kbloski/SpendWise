import { User } from "../models/schemas";
import AbstractCrudController from "./AbstractCrudController";
import UserType from "../types/UserType";
import { compareString, hashString } from "../utils/hashUtils";
import { where, WhereOptions } from "sequelize";
import { sequelize } from "../utils/db";
import {
    budgetController,
    budgetSharesController,
    userController,
} from "./controllers";

export default class UserController extends AbstractCrudController<User> {
    constructor() {
        super(User);
    }

    async create(data: Omit<UserType, "id">): Promise<User | null> {
        try {
            const userExist = await this.model.findAll({
                where: { email: data.email },
            });
            if (userExist.length)
                throw new Error(`User with this email exist in database`);
            data.password = await this.hashPassword(data.password);
            return super.create(data);
        } catch (err) {
            console.error(err);
            throw new Error("Failed create UserControler.create() ");
        }
    }

    async updateById(
        id: number,
        data: Partial<Omit<UserType, "id">>
    ): Promise<Boolean> {
        if (data.password) {
            data.password = await this.hashPassword(data.password);
        }
        return super.updateById(id, data);
    }

    async getByEmail(email: string) {
        const users = await this.model.findAll({
            where: { email } as WhereOptions,
        });
        if (users[0]) return users[0];
        return undefined;
    }

    async validPassword(password: string, userDb: UserType | User) {
        return await compareString(password, userDb.password);
    }

    async hashPassword(password: string) {
        return await hashString(password);
    }

    async deleteById(id: number): Promise<Boolean> {
        const transaction = await sequelize.transaction();
        try {
            const userBudgets =
                await budgetController.getAccessibleBudgetsForUser(id);

            if (userBudgets){
                for(const b of userBudgets){
                    await budgetController.deleteById(b.id)
                }
            }

            await budgetSharesController.deleteWhere({ user_id: id });

            const isDeleted = super.deleteById( id )
            return !!isDeleted;
        } catch (err) {
            transaction.rollback();
            console.error(err);
            throw new Error("Failed delete user with id: " + id);
        }
    }
}
