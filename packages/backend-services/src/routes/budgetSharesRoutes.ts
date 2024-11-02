import {Router} from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import { isNumber } from '../utils/utils';
import { budgetController, budgetSharesController } from '../controllers/controllers';

const router = Router();

router.post(
    buildApiPath("budgets", ":id", "shares"),
    async (req, res )=>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const {id} = req.params;
            if(!isNumber) return sendErrorResponse(res, 400, "Invalid type id, id must be a number");

            const budgetDb = await budgetController.getById( Number(id));
            if (!budgetDb) return sendErrorResponse(res, 404, "Budget not found");

            const accessToBudget = await budgetSharesController.isAccessUserToBudget(budgetDb, req.user);
            if (!accessToBudget) return sendErrorResponse(res, 403);

            const users = await budgetSharesController.getAllUsersforBudget( budgetDb);

            return sendSuccessResponse(res, 200, { users })
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
);

export default router;
