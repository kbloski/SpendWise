import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import BudgetType from "../types/BudgetType";
import { budgetController, userController } from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";

const router = Router()

router.get(
    buildApiPath("budgets"),
    async (req, res) => {
        if (!req.user) return;

        // @ts-ignore
        const budgets = await budgetController.getAllByUserId( 133 )

        return sendSuccessResponse(res, 200, { budgets });
    }
);

router.post(
    buildApiPath("budgets"),
    async (req,res) => {
        try {
            const { name } = req.body;
            if (!name) return sendErrorResponse(res, 400)
            const newBudget = await budgetController.create({
                name,
            })
            if (!newBudget) throw new Error("Cannot create budget")
            return sendErrorResponse(res, 201)
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
);




export default router;