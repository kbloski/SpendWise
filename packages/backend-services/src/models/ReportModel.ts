import { sequelize } from "../utils/db";
import ReportType from "../types/ReportType";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export default class Report extends Model<InferAttributes<Report>, InferCreationAttributes<Report>> implements ReportType{
    declare id: number;
    declare budget_id: number;
    declare period_start: Date;
    declare period_end: Date;
    declare total_expenses: number;
}

Report.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: { isInt: true}
    },
    budget_id: DataTypes.INTEGER,
    period_start: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {isDate: true}
    },
    period_end: {
        type: DataTypes.DATE,
        validate: {isDate: true},
        defaultValue: DataTypes.NOW
    },
    total_expenses: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    sequelize,
    timestamps: false
})
