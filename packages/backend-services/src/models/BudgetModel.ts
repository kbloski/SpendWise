import { sequelize } from "../utils/db";
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import BudgetType from "../types/BudgetType";

export default class Budget extends Model<InferAttributes<Budget>, InferCreationAttributes<Budget>> implements BudgetType
{
    declare createdAt: Date;
    declare updatedAt: Date;
    declare id: number;
    declare name: string;
    declare user_id: number;
}

Budget.init(
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
        user_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
);

// Tabela budgets
// id: unikalny identyfikator budżetu
// name: nazwa budżetu
// user_id: identyfikator użytkownika (właściciela budżetu)
// created_at: data utworzenia budżetu
