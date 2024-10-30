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
        const userExist = await this.model.findAll({ where: { email: data.email}})
        if (userExist) throw new Error(`User with email ${data.email} exist in database`)

        if (data.password) {
            data.password = await hashString(data.password);
        }
        return super.create(data);
    }

    async updateById(id: number, data: UserType): Promise<Boolean> {
        return super.updateById(id, data);
    }

    async getByEmail(email: string) {
        const users = await this.model.findAll({ where: { email } as WhereOptions });
        return users[0]
    }

    async validPassword(password: string, userDb: UserType | User) {
        return await compareString(password, userDb.password);
    }
}
