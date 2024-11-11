import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import CategoryType from "../types/CategoryType";
import { budgetController, budgetSharesController, categoryController } from "../controllers/controllers";
import { isNumber } from "../utils/utils";
import BudgetType from "../types/BudgetType";

const router = Router();

router.post(
    buildApiPath("budgets", ":budgetId", "categories"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const { budgetId  } = req.params;
            const { name }: Partial<CategoryType> = req.body;
            if (!name || !isNumber(budgetId) ) return sendErrorResponse(res, 400, "Invalid Id or name. Id must be number. Name must be string. ");

            const budgetExist = await budgetController.getById( Number(budgetId)  );
            if (!budgetExist) return sendErrorResponse(
                    res, 404,"Budget with id: " + budgetId + " not exist");

            const newCategory = await categoryController.create({
                budget_id: Number(budgetId), name: String(name) });
            if (!newCategory) throw new Error("Cannot create category");

            return sendSuccessResponse(res, 201);
        } catch (err) {
            return sendErrorResponse(res, 500);
        }
    }
);

router.get(
    buildApiPath("budgets", ":budgetId", "categories"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const { budgetId  } = req.params;

            const budgetExist = await budgetController.getById( Number(budgetId)  );
            if (!budgetExist) return sendErrorResponse(
                    res, 404,"Budget with id: " + budgetId + " not exist");

            const categories = await categoryController.getAllByBudgetId(Number(budgetId));

            return sendSuccessResponse(res, 200, {categories: categories});
        } catch (err) {
            return sendErrorResponse(res, 500);
        }
    }
);

router.get(
    buildApiPath("categories", ":id"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401)

            const { id } = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

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
            if (!name && !budget_id) return sendErrorResponse(res, 400, "Please provide name or budget_id");

            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

            if ( budget_id ){
                if (!isNumber(budget_id)) return sendErrorResponse(res, 400, "Invalid budget_id. Id must be a number.");

                const budgetDb = await budgetController.getById( Number(budget_id));
                if (!budgetDb) return sendErrorResponse(res, 404, "Budget with id " + budget_id + ' not exist.')

                const accessToBudget = budgetSharesController
                .isAccessUserToBudgetToModify( budgetDb, req.user);

                if (!accessToBudget) return sendErrorResponse(res, 403, "Forbidden to modify budget resources.");
            }

            const categoryDb = await categoryController.getById( Number(id));
            if (!categoryDb) return sendErrorResponse(res, 404);

            const access = await categoryController.isAccessibleCategoryForUserToModify( categoryDb, req.user);
            if (!access) return sendErrorResponse(res, 403, "Forbidden: You can't modify by role.");

            const dataToUpdate : Partial<CategoryType> = {}
            if (name) dataToUpdate.name = name;
            if (budget_id) dataToUpdate.budget_id = Number( budget_id );
            const isUpdated = await categoryController.updateById( categoryDb.id, dataToUpdate);

            if (!isUpdated) throw new Error("Cannot update the category resource.");
            return sendSuccessResponse(res, 204)
        } catch(err){
            console.error(err)
            return sendErrorResponse(res, 500)
        }
    }
);

router.delete(
    buildApiPath("categories", ":id"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const { id } = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

            const categoryDb = await categoryController.getById( Number(id ));
            if (!categoryDb) return sendErrorResponse(res, 404)

            const isAccessToModify = await categoryController.isAccessibleCategoryForUserToModify(categoryDb, req.user);
            if (!isAccessToModify) return sendErrorResponse(res, 403, "You don't have access by role.");

            const isDeleted = await categoryController.deleteById( Number(id));
            if (!isDeleted) throw new Error("Cannot delete resource with id " + id);
            
            return sendSuccessResponse(res, 204)            
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
);

export default router;
