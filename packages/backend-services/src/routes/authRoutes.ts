import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import UserType from "../types/UserType";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";

const router = Router();
// router.post(buildApiPath("login"), async (req, res) => {
//     const { email, password }: Partial<UserType> = req.body;
//     if (!email || !password) return sendErrorResponse(res, 400);
//     const userDb = await userController.getByEmail(email);
//     if (!userDb) return sendErrorResponse(res, 404);
//     if (!(await userController.validPassword(password, userDb)))
//         return sendErrorResponse(res, 400);
//     sendSuccessResponse( res, {data: 'success'})
// });

export default router;
