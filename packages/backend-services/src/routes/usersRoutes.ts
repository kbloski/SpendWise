import { Router } from 'express';
import { buildApiPath } from '../utils/apiUtils';
import { userController } from '../controllers/controllers';
import { sendErrorResponse, sendSuccessResponse } from '../utils/responseUtils';


const router = Router()

router.get( 
    buildApiPath('users'),
    async (req, res) =>{
        try {
            if (!req.user) return sendErrorResponse(res, 401);
            const userExist = await userController.getById( req.user.id )
            if (!userExist) return sendErrorResponse(res, 404)
            return sendSuccessResponse( res, 200, { id: userExist} )
        } catch (err){
            sendErrorResponse(res, 500)
        }

    }
)

export default router