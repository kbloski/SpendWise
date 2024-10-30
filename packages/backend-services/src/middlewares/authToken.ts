import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { createWebToken, decodeWebToken } from "../utils/jwtUtils";

export default async function authTokenMiddleware(
    req : Request, res : Response, next : NextFunction) 
{
    try {
        const authHeader = req.headers['authorization']

        
        // if (!authHeader) return next()
            // return sendErrorResponse(res, 401, "Unauthorized");
        
        // const token = createWebToken( {id:1})
        // const token = authHeader.split(' ')[1] ?? false;
        // if (!token) return false;
        
        // const tokenDecoded : any = decodeWebToken( token )

        // if ( tokenDecoded && typeof tokenDecoded === 'object' ){
        //     console.log( tokenDecoded.id)
        //     tokenDecoded.id 
        // }


        // console.log( tokenDecoded. )
        // console.log( typeof tokenDecoded)
        // if (tokenDecoded) console.log( tokenDecoded )
        // if ( 

        // )
        // console.log( "Authorization")
        // next()
        // sendSuccessResponse( res, 200)
        next()
    } catch (err : any){
        next()
        // throw new Error( "Middleware authorization error: " + err.message)
    }
}