import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/responseUtils";
import {  decodeWebToken } from "../utils/jwtUtils";
import checkAccess from "../utils/checkAccess";
import Roles from "../enum/RolesEnum";
import { userController } from "../controllers/controllers";

export default async function authTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let role = Roles.GUEST;
        const authHeader = req.headers["authorization"];
        
        if (!authHeader && checkAccess(role, req.path, req.method)) return next();
        if (!authHeader) return sendErrorResponse(res, 401);

        const authorization = authHeader.split(" ");
        if (authorization.length !== 2)
            return sendErrorResponse(
                res, 401, "Invalid authorization header form" );

        const token = authorization[1];
        const decoded = decodeWebToken(token);

        if (!decoded || !(typeof decoded === "object"))
            return sendErrorResponse(res, 401, "Invalid payload token");

        if (decoded && !decoded.id)
            return sendErrorResponse(res, 401, "Invalid payload token");

        const userDb = await userController.getById(decoded.id);
        if (!userDb)
            return sendErrorResponse(
                res, 404, "Not found user by middleware auth" );

        role = Roles.USER;
        req.user = userDb.dataValues;

        if (!checkAccess(role, req.path, req.method))
            return sendErrorResponse(res, 401, "Unauthorized by middleware - (Access control list).");
        return next();
    } catch (err: any) {
        throw new Error("Middleware authorization error: " + err.message);
    }
}
