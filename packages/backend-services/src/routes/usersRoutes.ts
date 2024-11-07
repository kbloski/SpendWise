import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { userController } from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import UserType from "../types/UserType";

const router = Router();

router.get(buildApiPath("users", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);

        const dataToSend: Partial<UserType> = req.user;
        delete dataToSend.password;

        return sendSuccessResponse(res, 200, { user: dataToSend });
    } catch (err) {
        sendErrorResponse(res, 500);
    }
});

router.patch(buildApiPath("users", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);

        const { password, username } = req.body;
        if (
            (!password && !username) ||
            username === '' ||
            password === ""
        ) return sendErrorResponse( 
            res, 400, "Please provide username or password to update." );

        const isUpdated = await userController.updateById(
            req.user.id, { password: password, username: username });
        if (!isUpdated) return sendErrorResponse(res, 500);
        
        return sendSuccessResponse(res, 201);
    } catch (err) {
        sendErrorResponse(res, 500);
    }
});

router.delete(buildApiPath("users", "me"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 401);

        const isDeleted = await userController.deleteById(req.user.id);
        if (!isDeleted) return sendErrorResponse(res, 404 );
        
        return sendSuccessResponse(res, 204);
    } catch (err){
        return sendErrorResponse(res, 500)
    }
});

export default router;
