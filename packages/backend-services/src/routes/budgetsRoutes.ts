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
    try {
        if (!req.user) return;
        const budgets =
            await budgetSharesController.getAccessibleWithBudgetForUser(
                req.user.id
            );
        return sendSuccessResponse(res, 200, { budgets }); // maybe with user-role for frontend
    } catch (err){
        return sendErrorResponse(res, 500)
    }
});

router.post(buildApiPath("budgets", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401, "Not authorized user.");

        const { name }: Partial<BudgetType> = req.body;
        if (!name) return sendErrorResponse(res, 400, "Please provide name for budget.");

        const newBudget = await budgetController.create({
            name, user_id: req.user.id });
        if (!newBudget) throw new Error("Cannot create budget");

        return sendSuccessResponse(res, 201);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

router.get( buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401, "Not authorized user.");

        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

        const budgetExist = await budgetController.getById(Number(id));
        if (!budgetExist)return sendErrorResponse(res, 404, "Budget don't exist.");
        
        const access = (await budgetSharesController.isAccessUserToBudget( budgetExist, req.user))
        if (!access) return sendErrorResponse(res, 403, "Forbidden to resource.");

        return sendSuccessResponse(res, 200, { budget: budgetExist });
    } catch (err) {
        sendErrorResponse(res, 500);
    }
});

router.patch(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401, "Not authorized user.");
        const { id } = req.params;

        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");
        const { name, owner_email } = req.body;

        if (!name && !owner_email) return sendErrorResponse(res, 400, "Please provide name or owner_email.");

        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);

        const access = await budgetSharesController.isAccessUserToBudgetToModify( budgetDb, req.user)
        if ( !access ) return sendErrorResponse(res, 403, "You don't have access to modify.");

        const dataToUpdate : Partial<BudgetType> = {};
        if (name) dataToUpdate.name = name;
        if (owner_email){
            const newOwner = await userController.getByEmail( owner_email ?? '');
            if (!newOwner) return sendErrorResponse(res, 404, "Not found user with email: " + owner_email)
            dataToUpdate.user_id = newOwner.id
        }
        
        const updated = await budgetController.updateById(
        budgetDb.id,dataToUpdate );
        
        if (!updated) throw new Error("Cannot update source");
        sendSuccessResponse(res, 204);
    } catch (err) {
        console.log(err)
        sendErrorResponse(res, 500);
    }
});

router.delete(buildApiPath("budgets", ":id"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);

        const { id } = req.params;
        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);

        const access = await budgetSharesController.isAccessUserToBudget(budgetDb,req.user )
        if (!access) return sendErrorResponse(res, 403);

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
        if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404);

        const access =await budgetSharesController.isAccessUserToBudget(budgetDb, req.user)
        if (!access)  return sendErrorResponse(res, 403);

        const totalExpenses =   await budgetController.getTotalBudgetCategoryExpenses(budgetDb);

        return sendSuccessResponse(res, 200, { total: totalExpenses });
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

export default router;
