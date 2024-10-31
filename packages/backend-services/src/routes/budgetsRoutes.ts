import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import BudgetType from "../types/BudgetType";
import { budgetController } from "../controllers/controllers";
import { sendErrorResponse } from "../utils/responseUtils";

const router = Router()

router.post(
    buildApiPath("budgets"),
    async (req,res) => {
        try {
            const { name } = req.body;
            if (!name) return sendErrorResponse(res, 400)
            const newBudget = await budgetController.create({name})
            if (!newBudget) throw new Error("Cannot create budget")
            return sendErrorResponse(res, 201)
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
);





export default router;