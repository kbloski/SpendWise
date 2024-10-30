import { Model, ModelStatic, Optional, WhereOptions } from "sequelize";

export default abstract class AbstractCrudController<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    async create(data: Optional<any, "id">): Promise<T | null> {
        if (data.id) delete data.id;
        return await this.model.create(data as any);
    }

    async getAll(): Promise<T[] | null> {
        return await this.model.findAll();
    }

    async getById(id: number): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async findOneWhere(whereOptions: WhereOptions) {
        return await this.model.findAll({ where: whereOptions });
    }

    async updateById(id: number, data: any): Promise<Boolean> {
        return !(await this.model.update(data, {
            where: { id } as WhereOptions,
        }));
    }

    async deleteById(id: number): Promise<Boolean> {
        return !(await this.model.destroy({ where: { id } as WhereOptions }));
    }
}
