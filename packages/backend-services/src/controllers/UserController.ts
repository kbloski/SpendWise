import { User } from "../models/schemas";
import AbstractCrudController from "./AbstractCrudController";
import UserType from "../types/UserType";
import { compareString, hashString } from "../utils/hashUtils";
import { where, WhereOptions } from "sequelize";

export default class UserController extends AbstractCrudController<User> {
    constructor() {
        super(User);
    }

    async create(data: Omit<UserType, "id">): Promise<User | null> {
        const userExist = await this.model.findAll({
            where: { email: data.email },
        });
        if (userExist.length)
            throw new Error(`User with this email exist in database`);
        if (data.password) {
            data.password = await hashString(data.password);
        }
        return super.create(data);
    }

    async updateById(
        id: number,
        data: Partial<Omit<UserType, "id">>
    ): Promise<Boolean> {
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
}
