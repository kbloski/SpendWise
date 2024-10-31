import { Model, ModelStatic, Optional, WhereOptions } from "sequelize";
import UserType from "../types/UserType";

export default abstract class AbstractCrudController<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    async create(data: Optional<any, "id">): Promise<T | null> {
        if (data.id) delete data.id;
        return await this.model.create(data as any);
    }

    async getAll(
        orderBy: "ASC" | "DESC" = "ASC",
        sortedProp: string = "id",
        where : Partial<T> = {}
    ): Promise<T[] | null> {
        return await this.model.findAll({ order: [[sortedProp, orderBy]] , where : where as WhereOptions});
    }

    async getById(id: number): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async getOneWhere(whereOptions: WhereOptions) {
        return await this.model.findAll({ where: whereOptions });
    }

    async updateById(
        id: number,
        data: Partial<Omit<any, "id">>
    ): Promise<Boolean> {
        const updCount = await this.model.update(data, {
            where: { id } as WhereOptions,
        })
        return !!(updCount);
    }

    async deleteAll(){
        const deltedCount = await this.model.destroy({where: {}})
        return !(deltedCount);
    }

    async deleteById(id: number): Promise<Boolean> {
        return !(await this.model.destroy({ where: { id } as WhereOptions }));
    }
}
