import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import ExpenseType from "../types/ExpenseType";
import {
    categoryController,
    expenseController,
} from "../controllers/controllers";
import { isNumber } from "../utils/utils";

const router = Router();

router.post(buildApiPath("expenses", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        if (!req.params) return sendErrorResponse(res, 401);
        const { amount, description, category_id }: ExpenseType = req.body;
        if (
            !amount ||
            !category_id ||
            !isNumber(amount) ||
            !isNumber(category_id)
        )
        return sendErrorResponse(res, 400);

        const categoryDb = await categoryController.getById(
            Number(category_id)
        );
        if (!categoryDb)
            return sendErrorResponse(
                res,
                404,
                "Not found category with id: " + category_id
            );
        const accessToCategory =
            await categoryController.isAccessibleCategoryForUser(
                categoryDb,
                req.user
            );
        if (!accessToCategory) return sendErrorResponse(res, 403);

        const newExpense = await expenseController.create({
            amount: Number(amount),
            category_id: Number(category_id),
            description: description,
            user_id: req.user.id,
        });
        if (!newExpense) throw new Error("Cannot create new expense");
        return sendSuccessResponse(res, 201);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

export default router;
