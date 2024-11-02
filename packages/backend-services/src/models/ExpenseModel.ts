import { sequelize } from "../utils/db";
import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import ExpenseType from "../types/ExpenseType";

export default class Expense extends Model<InferAttributes<Expense>, InferCreationAttributes<Expense>> implements ExpenseType
{
    declare id: number;
    declare amount: number;
    declare description: string;
    declare date: Date;
    declare category_id: number;
    declare user_id: number;
}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: { isInt: true }
        },
        amount: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
            validate: { isDecimal: true },
        },
        description: DataTypes.STRING,
        date: {
            type: DataTypes.DATE,
            // defaultValue: DataTypes.NOW.
            defaultValue: sequelize.fn("CURRENT_TIMESTAMP")
        },
        category_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, 
    {
        sequelize,
        timestamps: false
    }
)
// Tabela expenses
// id: unikalny identyfikator wydatku
// amount: kwota wydatku
// description: opis wydatku
// date: data wydatku
// category_id: identyfikator kategorii, do której należy wydatek
// // user_id: identyfikator użytkownika, który dodał wydatek