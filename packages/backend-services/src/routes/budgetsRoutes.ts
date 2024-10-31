import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import BudgetType from "../types/BudgetType";
import {
    budgetController,
    budgetSharesController,
    userController,
} from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { isNumber } from "../utils/utils";

const router = Router();

router.get(buildApiPath("budgets", "me"), async (req, res) => {
    if (!req.user) return;

    // @ts-ignore
    const budgets = await budgetController.getAccessibleBudgetsForUser(
        req.user.id
    );
    return sendSuccessResponse(res, 200, { budgets });
});

router.post(buildApiPath("budgets", "me"), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return sendErrorResponse(res, 400);
        const newBudget = await budgetController.create({
            name,
        });
        if (!newBudget) throw new Error("Cannot create budget");
        return sendErrorResponse(res, 201);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

router.get(buildApiPath("budgets", ":id"), async (req, res) => {
    if (!req.user) return sendErrorResponse(res, 401);
    const { id } = req.params;
    if (!isNumber(Number(id))) return sendErrorResponse(res, 400, "Invalid Id");
    const budgetExist = await budgetController.getById(Number(id));
    if (!budgetExist) return sendErrorResponse(res, 404, "Budget don't exist");

    const access = await budgetSharesController.getIdUserBudgetRelation(
        req.user,
        budgetExist
    );
    if (!access) return sendErrorResponse(res, 401);
    return sendSuccessResponse(res, 200, { budget: budgetExist });
});

router.patch(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { id } = req.params;
        const { name, user_id }: Partial<Omit<BudgetType, "id">> = req.body;
        if (!name) return sendErrorResponse(res, 404);
        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);
        const access = await budgetSharesController.getIdUserBudgetRelation(
            req.user,
            budgetDb
        );
        if (!access) return sendErrorResponse(res, 403);
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
export default router;
