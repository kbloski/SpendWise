import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import CategoryType from "../types/CategoryType";
import { budgetController, budgetSharesController, categoryController } from "../controllers/controllers";
import { isNumber } from "../utils/utils";
import Budget from "../models/BudgetModel";
import { UserRoles } from "../types/BudgetShareType";

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
        return sendErrorResponse(res, 500);
    }
});

router.get(
    buildApiPath("categories", ":id"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401)
            const { id } = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid id");

            const categoryDb = await categoryController.getById( Number(id) );
            if (!categoryDb) return sendErrorResponse(res, 404);

            const accessToCategory = await categoryController.isAccessibleCategoryForUser( categoryDb, req.user )
            if (!accessToCategory) return sendErrorResponse(res, 403)
            
            return sendSuccessResponse(res, 200, {category: categoryDb})
        } catch (err){
            return sendErrorResponse( res, 500)
        }
    }
);

router.patch(
    buildApiPath("categories", ":id"),
    async (req,res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401)
            const { id } = req.params;
            const { name, budget_id} : CategoryType = req.body;
            if (!name || !budget_id) return sendErrorResponse(res, 404);

            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type id, id must be number");
            const categoryDb = await categoryController.getById( Number(id));
            if (!categoryDb) return sendErrorResponse(res, 404);

            const access = await categoryController.isAccessibleCategoryForUser( categoryDb, req.user);
            if (!access) return sendErrorResponse(res, 403);

            const isUpdated = await categoryController.updateById( categoryDb.id, { name, budget_id: Number(budget_id)});
            if (!isUpdated) throw new Error("Cannot update the category resource.");
            return sendSuccessResponse(res, 204)
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
);


export default router;
