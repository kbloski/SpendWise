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
    declare id: number;
    declare name: string;
    declare user_id: number;
    declare created_at: Date;
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
            allowNull: false
        },
        user_id: DataTypes.INTEGER,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW // or sequelize.fn("CURRENT_TIMESTAMP")
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);

// Tabela budgets
// id: unikalny identyfikator budżetu
// name: nazwa budżetu
// user_id: identyfikator użytkownika (właściciela budżetu)
// created_at: data utworzenia budżetu
