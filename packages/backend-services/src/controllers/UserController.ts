import { User } from "../models/schemas";
import AbstractCrudController from "./AbstractCrudController";
import UserType from "../types/UserType";
import { compareString, hashString } from "../utils/hashUtils";
import { WhereOptions } from "sequelize";

export default class UserController extends AbstractCrudController<User> {
    constructor() {
        super(User);
    }

    async create(data: Omit<UserType, "id">): Promise<User | null> {
        if (data.password) {
            data.password = await hashString(data.password);
        }
        return super.create(data);
    }

    async updateById(id: number, data: UserType): Promise<Boolean> {
        return super.updateById(id, data);
    }

    async getByEmail(email: string) {
        return await this.model.findAll({ where: { email } as WhereOptions });
    }

    async validPassword(password: string, userDb: UserType) {
        return await compareString(password, userDb.password);
    }
}
