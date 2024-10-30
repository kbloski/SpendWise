import jwt from 'jsonwebtoken';
import UserType from '../types/UserType';

const TOKEN_EXPRES = process.env.TOKEN_EXPIRES ?? "1d";
if (!process.env.JWT_SECRET) throw new Error("JWT Secret key not found");

export function createWebToken(
    payload: jwt.JwtPayload,
    options : jwt.SignOptions = {
        expiresIn: TOKEN_EXPRES,
    }
){
    return jwt.sign(payload, String( process.env.JWT_SECRET ) , options);
}

export function decodedToken( token: string){
    try {
        const decoded : string | jwt.JwtPayload = jwt.verify( token, String( process.env.JWT_SECRET) );
        return decoded
    }catch(err){
        console.error( "Error verify token - please provide valid token" )
    }
}