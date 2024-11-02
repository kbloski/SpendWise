import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import CategoryType from "../types/CategoryType";
import { budgetController, budgetSharesController, categoryController } from "../controllers/controllers";
import { isNumber } from "../utils/utils";
import Budget from "../models/BudgetModel";

const router = Router();

router.post(buildApiPath("categories"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { name, budget_id }: Partial<CategoryType> = req.body;
        if (!name || !budget_id) return sendErrorResponse(res, 404);

        const budgetExist = await budgetController.getById(Number(budget_id));

        if (!budgetExist) return sendErrorResponse(res, 404, "Budget with id: "+budget_id+" not exist");

        const newCategory = await categoryController.create({
            budget_id: Number(budget_id),
            name: String(name),
        });
        if (!newCategory) throw new Error("Cannot create category");
        return sendSuccessResponse(res, 201);
    } catch (err) {
        console.log( err )
        return sendErrorResponse(res, 500);
    }
});

// router.get(
//     buildApiPath("categories", ":id"),
//     async (req, res) => {
//         if (!req.user) return sendErrorResponse(res, 401)
//         const { id } = req.params;
//         if (!isNumber(id)) return sendErrorResponse(res, 400)
        
//         const categoryDb = await categoryController.getById( Number(id));
//         if (!categoryDb) return sendErrorResponse(res, 404)

//         const relative_budget = await budgetController.getById(categoryDb.budget_id) as Budget
//         if (!budgetSharesController.isAccessUserToBudget(relative_budget, req.user)) return sendErrorResponse(res, 403);

//         return sendSuccessResponse(res, 200, { category: categoryDb})
//     }
// );


export default router;
