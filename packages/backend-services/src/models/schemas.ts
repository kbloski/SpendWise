import { sequelize } from "../utils/db";
import User from "./UserModel";
import Report from "./ReportModel";
import Expense from "./ExpenseModel";
import Category from "./CategoryModel";
import Budget from "./BudgetModel";
import BudgetShare from "./BudgetSharesModel";

// users może mieć wiele budgets.
User.hasMany(Budget, { foreignKey: "user_id" });
Budget.belongsTo(User, { foreignKey: "user_id" });

// budgets mogą mieć wiele categories.
Budget.hasMany(Category, { foreignKey: "budget_id" });
Category.belongsTo(Budget, { foreignKey: "budget_id" });

// budgets mogą mieć wiele reports.
Budget.hasMany( Report, { foreignKey: "budget_id"})
Report.belongsTo( Budget, { foreignKey: "budget_id"})

// budgets mogą być współdzielone z wieloma users przez tabelę budget_shares.
Budget.belongsToMany(User, {
    through: "budget_shares",
    foreignKey: "fk_budget_id",
});
User.belongsToMany(Budget, {
    through: "budget_shares",
    foreignKey: "fk_user_id",
});

// categories mogą mieć wiele expenses.
Category.hasMany(Expense, { foreignKey: "expense_id" });
Expense.belongsTo(Category, { foreignKey: "expense_id" });

export async function syncDb() {
    try {
        await sequelize.sync();
        console.log("Database Synchronization Success");
    } catch (err) {
        console.error(err, "DataBase Synchronization Failed");
    }
}

export { User, Report, Expense, Category, Budget, BudgetShare };
