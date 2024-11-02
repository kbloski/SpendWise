import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import BudgetType from "../types/BudgetType";
import {
    budgetController,
    budgetSharesController,
} from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { isNumber } from "../utils/utils";

const router = Router();

router.get(buildApiPath("budgets", "me"), async (req, res) => {
    if (!req.user) return;
    const budgets = await budgetController.getAccessibleBudgetsForUser(
        req.user.id
    );
    return sendSuccessResponse(res, 200, { budgets }); // maybe with user-role for frontend
});

router.post(buildApiPath("budgets", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { name }: Partial<BudgetType> = req.body;
        if (!name) return sendErrorResponse(res, 400);

        const newBudget = await budgetController.create({
            name,
            user_id: req.user.id,
        });
        if (!newBudget) throw new Error("Cannot create budget");
        return sendSuccessResponse(res, 201);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

router.get(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid Id");
        const budgetExist = await budgetController.getById(Number(id));
        if (!budgetExist)return sendErrorResponse(res, 404, "Budget don't exist");
        
        const access = (await budgetSharesController.isAccessUserToBudget( budgetExist, req.user))
        if (!access)
            return sendErrorResponse(res, 403);
        return sendSuccessResponse(res, 200, { budget: budgetExist }); // maybe with user-role for frontend
    } catch (err) {
        // console.error(err)
        sendErrorResponse(res, 500);
    }
});

router.patch(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { id } = req.params;

        if (!isNumber(id)) return sendErrorResponse(res, 404);
        const { name, user_id }: Partial<Omit<BudgetType, "id">> = req.body;

        if (!name) return sendErrorResponse(res, 404);
        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);

        const access = await budgetSharesController.isAccessUserToBudget( budgetDb,req.user)
            console.log(access)
        if ( !access ) return sendErrorResponse(res, 403);

        const updated = await budgetController.updateById(budgetDb.id, {
            name,
            user_id,
        });
        
        if (!updated) throw new Error("Cannot update source");
        sendSuccessResponse(res, 204);
    } catch (err) {
        sendErrorResponse(res, 500);
    }
});

router.delete(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 404);
        if (!req.user) return sendErrorResponse(res, 401);
        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);

        const access = await budgetSharesController.isAccessUserToBudget(budgetDb,req.user )
        if (!access)
            return sendErrorResponse(res, 403);
        const deleted = await budgetController.deleteById(budgetDb.id);
        if (!deleted) throw new Error("Cannot delete budget resource");
        return sendSuccessResponse(res, 204);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

router.get(buildApiPath("budgets", ":id", "summary"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 404);
        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);
        const access =await budgetSharesController.isAccessUserToBudget(budgetDb, req.user)
        if (!access)
            return sendErrorResponse(res, 403);

        const totalExpenses =
            await budgetController.getTotalBudgetCategoryExpenses(budgetDb);

        return sendSuccessResponse(res, 200, { total: totalExpenses });
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

export default router;
