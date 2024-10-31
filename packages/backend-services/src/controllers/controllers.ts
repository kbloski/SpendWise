import BudgetController from "./BudgetController";
import BudgetSharesController from "./BudgetSharesController";
import CategoryController from "./CategoryController";
import ExpenseController from "./ExpenseController";
import ReportController from "./ReportController";
import UserController from "./UserController";

const budgetController = new BudgetController();
const budgetSharesController = new BudgetSharesController()
const categoryController = new CategoryController();
const expenseController = new ExpenseController();
const reportController = new ReportController();
const userController = new UserController();


export {
    budgetController,
    budgetSharesController,
    categoryController,
    expenseController,
    reportController,
    userController,
};
