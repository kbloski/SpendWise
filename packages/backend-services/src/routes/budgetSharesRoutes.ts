import {Router} from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';
import { isNumber } from '../utils/utils';
import { budgetController, budgetSharesController, userController } from '../controllers/controllers';
import  { UserRoles } from '../types/BudgetShareType';
import { sequelize } from '../utils/db';
import UserType from '../types/UserType';

const router = Router();

router.get(
    buildApiPath("budgets", ":id", "shares"),
    async (req, res )=>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const {id} = req.params;
            if(!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type Id - Id must be a number.");

            const budgetDb = await budgetController.getById( Number(id));
            if (!budgetDb) return sendErrorResponse(res, 404 );

            const accessToBudget = await budgetSharesController.isAccessUserToBudget(budgetDb, req.user);
            if (!accessToBudget) return sendErrorResponse(res, 403);

            const users = await budgetSharesController.getAllUsersforBudget( budgetDb);
            const usersToSend = users.map( u => {
                const user : Partial<UserType> = u;
                delete user.password;
                return user;
            })
            return sendSuccessResponse(res, 200, { users : usersToSend })
        } catch (err){
            return sendErrorResponse(res, 500)
        }
    }
);

router.put(
    buildApiPath("budgets", ":id", "shares"),
    async (req, res )=>{
        const transaction = await sequelize.transaction();
        try {

            if (!req.user) return sendErrorResponse(res, 401);
            const {id} = req.params;
            if(!isNumber(id)) return sendErrorResponse(res, 400, "Invalid type id, id must be a number.");

            const { email, role } : any = req.body;
            if (!email) return sendErrorResponse(res, 400, "Please provide user_id.");

            if (
                role && !isNumber(role) ||
                role && (
                    role != Number(UserRoles.ADMIN) &&
                    role != Number(UserRoles.EDITOR) &&
                    role != Number(UserRoles.VIEWER)
                )
            ) return sendErrorResponse(
                res, 400,
                `variable role must be: admin=${Number(UserRoles.ADMIN)} or editor=${Number(UserRoles.EDITOR)} or viewer=${Number(UserRoles.VIEWER)}. If you not provide value, default will be a viewer.`
            );

            const budgetDb = await budgetController.getById( Number(id));
            if (!budgetDb) return sendErrorResponse(res, 404, "Budget not found");

            const userDb = await userController.getByEmail( email )
            if (!userDb) return sendErrorResponse(res, 404, "User with email "+email+ ' not exist')

            const accessToBudget = await budgetSharesController.isAccessUserToBudgetToModify(budgetDb, req.user);
            if (!accessToBudget) return sendErrorResponse(res, 403, "You can't modify by role.");

            const relationExist = await budgetSharesController.getIdUserBudgetRelation(budgetDb.id, userDb.id);
            if ( relationExist){
                console.log('exist', relationExist)
                await budgetSharesController.updateById( relationExist, { role})
            } else {
                await budgetSharesController.findOrCreate({
                    budget_id: budgetDb.id,
                    user_id: userDb.id
                })
            }
            transaction.commit()
            return sendSuccessResponse(res, 201)
        } catch (err){
            transaction.rollback()
            return sendErrorResponse(res, 500)
        }
    }
);


router.delete(buildApiPath("budgets", ":id", "shares", ":userId"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);
        const { id , userId} = req.params;
        if (!isNumber(id) || !isNumber(userId))
            return sendErrorResponse(
                res, 400, "Invalid type id, id must be a number" );

        if (Number(userId) === req.user.id) return sendErrorResponse(res, 403, "You can't delete your access.") 

        const budgetDb = await budgetController.getById(Number(id));
        if (!budgetDb) return sendErrorResponse(res, 404, "Budget not found");
        
        const accessToBudget =
        await budgetSharesController.isAccessUserToBudget(
            budgetDb, req.user );
        if (!accessToBudget) return sendErrorResponse(res, 403);

        const relationId = await budgetSharesController.getIdUserBudgetRelation( 
            budgetDb.id, Number(userId));
        if (!relationId) return sendErrorResponse(res, 404);

        const isDeleted = await budgetSharesController.deleteById( relationId );
        if (!isDeleted) throw new Error("Failed in deleted relation from database")

        return sendSuccessResponse(res, 204);
    } catch (err) {
        return sendErrorResponse(res, 500);
    }
});

export default router;
