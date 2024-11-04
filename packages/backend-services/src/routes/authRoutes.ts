import { Router } from "express";
import { buildApiPath } from "../utils/apiUtils";
import UserType from "../types/UserType";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";
import { userController } from "../controllers/controllers";
import { createWebToken } from "../utils/jwtUtils";

const router = Router();

router.post(
    buildApiPath('register'),
    async (req, res) => {
        try {
            const { username, email, password } : UserType = req.body
            if (!username || !email || !password) return sendErrorResponse( res, 400, "Plese provide username, email and password.");

            const userExist = await userController.getByEmail( email )
            if (userExist) return sendErrorResponse( res, 400, "User with email "+ email +" already exist." )

            const newUser = await userController.create( {email, password, username});
            if (!newUser)return sendErrorResponse(res, 500, "Cannot create user.")

            return sendSuccessResponse( res, 201 )
        } catch (err){
            return sendErrorResponse( res , 500)
        }
    }
)

router.post(
    buildApiPath("login"),
    async (req, res) => {
        try {
            const { email, password }: Partial<UserType> = req.body;
            if (!email || !password)
                return sendErrorResponse(
                    res,
                    400,
                    "Please provide email and password."
                );
            const userDb = await userController.getByEmail(email);
            if (!userDb) return sendErrorResponse(res, 404);
            if (!(await userController.validPassword(password, userDb)))
                return sendErrorResponse(res, 400, "Invalid password.");

            // --> Http-only cookie - Bezpieczniejszy sposób (reszta w authToken)
            // const token = createWebToken( userDb.dataValues )
            // res.cookie('authToken', token, {
            //     httpOnly: true,
            //     secure: false,
            //     sameSite: "none" ,
            //     maxAge: 1000 * 60 * 60 * 24
            // })
            // <-- req.cookie.authToken

            const token = createWebToken(userDb.dataValues);
            sendSuccessResponse(res, 200, { token: token });
        } catch (err){
            return sendErrorResponse( res, 500)
        }
});

export default router;
