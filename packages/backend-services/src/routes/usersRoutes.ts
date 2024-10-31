import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import { userController } from "../controllers/controllers";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";

const router = Router();

router.get(buildApiPath("users"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 400);
        return sendSuccessResponse(res, 200, { user: req.user });
    } catch (err) {
        sendErrorResponse(res, 500);
    }
});

router.patch(buildApiPath("users"), async (req, res) => {
    try {
        if (!req.user) return sendErrorResponse(res, 400);
        const { password, username } = req.body;
        if (!password && !username)
            return sendErrorResponse(
                res,
                400,
                "Please provide email or password to update"
            );
        const isUpdated = await userController.updateById(req.user.id, {
            password: password,
            username: username,
        });
        if (!isUpdated) return sendErrorResponse(res, 500);
        return sendSuccessResponse(res, 201);
    } catch (err) {
        console.log(err);
        sendErrorResponse(res, 500);
    }
});

export default router;
