import { Router } from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import { isNumber, isValidDate } from '../utils/utils';
import { budgetController, budgetSharesController, categoryController, expenseController, reportController } from '../controllers/controllers';

const router = Router();

router.get(
    buildApiPath("budgets", ":id", "reports"),
    async (req, res )=>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const { id } = req.params;
            if (!isNumber(id)) return sendErrorResponse(res, 400, 'Ivalid type number - must be string');

            const { per_start , per_end } = { 
                per_start: req.query.period_start,
                per_end: req.query.period_end
            };
            

            const budgetDb = await budgetController.getById( Number(id));
            if (!budgetDb) return sendErrorResponse(res, 404, "Budget not found")
                
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

                    return {
                        ...cat.dataValues,
                        totalAmount: total
                    }
                })
                )
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


export default router;