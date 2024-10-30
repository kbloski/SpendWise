import { sequelize } from "../utils/db";
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import CategoryType from "../types/CategoryType";

export default class Category
extends Model<InferAttributes<Category>, InferCreationAttributes<Category>>
implements CategoryType
{
    declare id: number;
    declare name: string;
    declare budget_id: number;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: { isInt: true },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        budget_id: DataTypes.INTEGER,
    },
    {
        sequelize,
        timestamps: false,
    }
);

    // Tabela categories
    // id: unikalny identyfikator kategorii
    // name: nazwa kategorii
    // budget_id: identyfikator budżetu, do którego należy kategoria
