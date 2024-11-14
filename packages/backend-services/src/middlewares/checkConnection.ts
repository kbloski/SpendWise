import { NextFunction, Request, Response } from "express";
import { connectDb, sequelize } from "../utils/db";
import { sendErrorResponse } from "../utils/responseUtils";

export default async function checkConnection(
    req: Request,
    res: Response,
    next: NextFunction
){
    await sequelize.authenticate()
    .then(
        () => next()
    ). catch( err => {
        console.error("Lost connection with database. ")
        connectDb()
        return sendErrorResponse(
            res,
            500,
            "Problem connection with database."
        )
    })


}