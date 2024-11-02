import { sequelize } from "../utils/db";
import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import BudgetShareType, { UserRoles } from "../types/BudgetShareType";

export default class BudgetShare extends Model<InferAttributes<BudgetShare>, InferCreationAttributes<BudgetShare>> implements BudgetShareType{
    declare id: number;
    declare user_id: number;
    declare budget_id: number;
    declare role: UserRoles;
    
}

BudgetShare.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true,
        },
    },
    budget_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: UserRoles.EDITOR,
        comment: `admin(${UserRoles.ADMIN}),editor(${UserRoles.EDITOR}),viewer(${UserRoles.VIEWER})`
    }
}, {
    sequelize,
    timestamps: false,
    tableName: "budget_shares"
});

// Tabela budget_shares
// id: unikalny identyfikator współdzielenia budżetu
// budget_id: identyfikator budżetu
// user_id: identyfikator użytkownika, który ma dostęp do budżetu
// role: rola użytkownika w budżecie (np. admin, edytor)
