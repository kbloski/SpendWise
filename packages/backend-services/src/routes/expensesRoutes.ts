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
import Category from "../models/CategoryModel";

const router = Router();

router.get(
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
            if (!isNumber(budgetId) || !isNumber(categoryId))
                return sendErrorResponse(
                    res, 400, "Invalid type budgetId or categoryId - Id must be a number" );

            const budgetDb = await budgetController.getById(Number(budgetId));
            if (!budgetDb)
                return sendErrorResponse( res, 404, "Budget with id: " + budgetId + " not found" );

            const isAccessToBudget =
                await budgetSharesController.isAccessUserToBudget( budgetDb, req.user );
            if (!isAccessToBudget) return sendErrorResponse(res, 403);

            const categoryDb = await categoryController.getById( Number(categoryId));
            if (!categoryDb) return sendErrorResponse(res, 404, "Category not found.");
            const isAccessToCategory = await categoryController.isAccessCategoryToBudget( categoryDb, budgetDb);

            if (!isAccessToCategory) return sendErrorResponse(res, 403, "Category not belong to budget.")

            const expensesDb = await expenseController.getCategoryExpenses( categoryDb.id )

            return sendSuccessResponse(res, 200, { expenses: expensesDb });
        } catch (err) {
            return sendErrorResponse(res, 500);
        }
    }
);

router.get(
    buildApiPath("budgets", ":budgetId", "expenses"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const { budgetId } = req.params;
            if (!isNumber(budgetId)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be a number");

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
            ) return sendErrorResponse(res, 400, "Bad from any id in url /api/budgets/budgetId/categories/categoryId/expenses. Id type must be number.");
            
            if (
                !amount
                || !isNumber(amount)
            ) return sendErrorResponse( res, 400, "Please provide amout. Amout must be type number.")

            const budgetDb = await budgetController.getById( Number(budgetId));
            if (!budgetDb) return sendErrorResponse(res, 404, "Not found budget.")

            const categoryDb = await categoryController.getById(Number(categoryId));
            if (!categoryDb) return sendErrorResponse( res,404, "Not found category with id: " + categoryId );

            const accessToCategory = await categoryController.isAccessCategoryToBudget(categoryDb, budgetDb);
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

router.get(
    buildApiPath("expenses", ":id"),
    async (req, res) =>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const {id} = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type id, id must be a number");
            const expenseDb = await expenseController.getById(Number(id));

            if (!expenseDb) return sendErrorResponse(res, 404);

            const accessToExpense = await expenseController.isAccessForUser(expenseDb,  req.user);
            if (!accessToExpense) return sendErrorResponse(res, 403);

            return sendSuccessResponse(res, 200, { expense: expenseDb})
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
);

router.patch(
    buildApiPath("expenses", ":id"),
    async (req, res) =>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const {id} = req.params;
            const { amount, description, user_id, category_id  } : Partial<ExpenseType> = req.body;
            if ( !isNumber(id) ) return sendErrorResponse(res, 400, "Invalid type id, id must be a number");
            if (
                !amount && !description && !user_id && !category_id ||
                amount && !isNumber(amount) ||
                user_id && !isNumber(user_id) ||
                category_id && !isNumber(category_id)
            ) return sendErrorResponse(res, 400, "Please provide amount, user_id or category_id");

            const expenseDb = await expenseController.getById(Number(id));
            if (!expenseDb) return sendErrorResponse(res, 404);

            const accessToExpense = await expenseController.isAccessForUser(expenseDb,  req.user);
            if (!accessToExpense) return sendErrorResponse(res, 403);

            await expenseController.updateById( 
                expenseDb.id, { amount, description, user_id, category_id })

            return sendSuccessResponse(res, 204)
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
);

router.delete(buildApiPath("expenses", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);

        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(
                res, 400, "Invalid type id, id must be a number" );

        const expenseDb = await expenseController.getById(Number(id));
        if (!expenseDb) return sendErrorResponse(res, 404);

        const accessToExpense = await expenseController.isAccessForUser(
            expenseDb,req.user );
        if (!accessToExpense) return sendErrorResponse(res, 403);
        
        const isDeleted = await expenseController.deleteById( Number(id));
        if (!isDeleted) throw new Error("Cannot delete expense with id: " + id);

        return sendSuccessResponse(res, 204 );
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

export default router;
