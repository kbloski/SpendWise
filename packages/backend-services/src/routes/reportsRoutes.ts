import { Router } from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import { isNumber, isValidDate } from '../utils/utils';
import { budgetController, budgetSharesController, categoryController, expenseController, reportController } from '../controllers/controllers';
import { Op } from 'sequelize';

const router = Router();

router.get(
    buildApiPath("budgets", ":id", "reports"),
    async (req, res )=>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const { id } = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, 'Ivalid type Id - Id must be number.');

            const { per_start , per_end } = { 
                per_start: req.query.period_start,
                per_end: req.query.period_end
            };
            
            const budgetDb = await budgetController.getById( Number(id));
            if (!budgetDb) return sendErrorResponse(res, 404, "Budget not found.")
                
            const isAccess = await budgetSharesController.isAccessUserToBudget( budgetDb, req.user);
            if (!isAccess) return sendErrorResponse(res, 403);

            const newReport = await reportController.create({
                budget_id: budgetDb.id,
                period_start: isValidDate(String(per_start))
                    ? new Date(String(per_start))
                    : undefined,
                period_end: isValidDate(String(per_end))
                    ? new Date(String(per_end))
                    : undefined,
            });

            const categories = await categoryController.getAllByBudgetId( budgetDb.id );
            let categoriesToSend : unknown[] = [];

            if (categories) {
                const newCategoriesData = await Promise.all(
                categories.map( async cat => {

                    const total = await expenseController.getTotalCategoryExpenses(cat.id);
                    return { ...cat.dataValues, totalAmount: total }
                }))
                categoriesToSend = [...newCategoriesData];
            }

            return sendSuccessResponse(res, 200, { 
                report: {
                    ...newReport?.dataValues,
                    categories: categoriesToSend
                }})
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
)

router.get(
    buildApiPath('reports', 'all'),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            
            const budgetsDb = await budgetController.getAccessibleBudgetsForUser( req.user.id );
            if (!budgetsDb) return sendErrorResponse( res, 404, "You don't have any budgets.")

            const ids = budgetsDb.map( b => b.id );

            const reports = await reportController.getAll("DESC", "id", { budget_id: {
                [Op.in] : ids
            } });;

            return sendSuccessResponse(res, 200, { reports })
        } catch(err){
            return sendErrorResponse(res, 500)
        }
    }
)

router.delete(
    buildApiPath("reports",":id"),
    async (req, res) => {
        try {
            if (!req.user) return sendErrorResponse(res, 401);

            const {id} = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be number.");

            const reportDb = await reportController.getById( Number(id) );
            if (!reportDb) return sendErrorResponse(res, 404)

            const budgetDb = await budgetController.getById( reportDb.budget_id);
            let isAccess = false;
            if (!budgetDb) isAccess = true;
            else isAccess = await budgetSharesController.isAccessUserToBudget( budgetDb, req.user );
            if (!isAccess) return sendErrorResponse(res, 403)
            
            const isDeleted = await reportController.deleteById( reportDb.id );
            if (!isDeleted) throw new Error("Report exist in database but cannot delete this resource");

            return sendSuccessResponse(res, 203);
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
);

export default router;