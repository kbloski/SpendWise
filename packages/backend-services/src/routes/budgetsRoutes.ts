import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import BudgetType from "../types/BudgetType";
import { budgetController, userController } from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { isNumber } from "../utils/utils";

const router = Router();

router.get(buildApiPath("budgets", "me"), async (req, res) => {
    if (!req.user) return;

    // @ts-ignore
    const budgets = await budgetController.getAllByUserId(req.user.id);
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

router.get(
    buildApiPath("budgets", ":id"),
    async (req, res ) => {
        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid Id");
        const budgetExist = await userController.getById( Number(id) )
        if (!budgetExist) return sendErrorResponse( res, 404, "Budget don't exist")
        
        // checkOwner (budgets shares)
        // console.log( )

        return sendSuccessResponse( res, 200, { budget: budgetExist})
    }
);

export default router;
