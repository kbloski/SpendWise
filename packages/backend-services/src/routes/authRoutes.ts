import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import UserType from "../types/UserType";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";

const router = Router();

router.post(
    buildApiPath('register'),
    async (req, res) => {
        const { username, email, password } : UserType = req.body
        if (!username || !email || !password) return sendErrorResponse( res, 400);
        const userExist = await userController.getByEmail( email )
        if (userExist) return sendErrorResponse( res, 403 )
        const newUser = await userController.create( {email, password, username});
        return sendSuccessResponse( res, 200, { token: newUser})
    }
)

router.post(
    buildApiPath("login"),
    async (req, res) => {
        const { email, password }: Partial<UserType> = req.body;
        if (!email || !password) return sendErrorResponse(res, 400);
        const userDb = await userController.getByEmail(email);
        if (!userDb) return sendErrorResponse(res, 404);
        if (!(await userController.validPassword(password, userDb)))
            return sendErrorResponse(res, 400);
        sendSuccessResponse( res, 200, {data: 'success'})
});

export default router;
