import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import ExpenseType from "../types/ExpenseType";
import {
    budgetController,
    budgetSharesController,
    categoryController,
    expenseController,
} from "../controllers/controllers";
import { isNumber } from "../utils/utils";

const router = Router();

router.get(
    buildApiPath("budgets", ":budgetId", "expenses"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const { budgetId } = req.params;
            if (!isNumber(budgetId)) return sendErrorResponse(res, 400, "Invalid id , id must be a number");

            const budgetDb = await budgetController.getById( Number(budgetId));
            if (!budgetDb) return sendErrorResponse(res, 404, "Budget with id: " + budgetId + " not found");

            const isAccessToBudget = await budgetSharesController.isAccessUserToBudget( budgetDb, req.user);
            if (!isAccessToBudget) return sendErrorResponse(res, 403);

            const expensesDb = await expenseController.getAllforBudget( budgetDb);
            return sendSuccessResponse( res, 200, { expenses: expensesDb})
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
);

router.post(
    buildApiPath(
        "budgets",
        ":budgetId",
        "categories",
        ":categoryId",
        "expenses"
    ),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const { budgetId, categoryId } = req.params;
            const { amount, description }: ExpenseType = req.body;
            if (
                !isNumber(budgetId) 
                || !isNumber(categoryId)
                || !amount
                || !isNumber(amount)
            ) return sendErrorResponse(res, 400);
                

            const categoryDb = await categoryController.getById(Number(categoryId));
            if (!categoryDb) return sendErrorResponse( res,404, "Not found category with id: " + categoryId );

            const accessToCategory = await categoryController.isAccessibleCategoryForUser(categoryDb, req.user);
            if (!accessToCategory) return sendErrorResponse(res, 403);

            const newExpense = await expenseController.create({
                amount: Number(amount),
                category_id: Number(categoryId),
                description: description,
                user_id: req.user.id,
            });
            if (!newExpense) throw new Error("Cannot create new expense");
            return sendSuccessResponse(res, 201);
        } catch (err) {
            return sendErrorResponse(res, 500);
        }
    }
);

export default router;
