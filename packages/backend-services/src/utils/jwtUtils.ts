import jwt from 'jsonwebtoken';
import UserType from '../types/UserType';

function processSecretExists(){
    const exist =  !!process.env.JWT_SECRET;
    if (!exist) throw new Error('JWT sectret not available')
}

export function createWebToken(
    payload: jwt.JwtPayload,
    options: jwt.SignOptions = {
        expiresIn: process.env.TOKEN_EXPIRES ?? '1d',
    }
) {
    processSecretExists()
    return jwt.sign(payload, String(process.env.JWT_SECRET), options);
}

export function decodeWebToken( token: string ){
    try {
        processSecretExists()
        const decoded = jwt.verify( token, String( process.env.JWT_SECRET) );
        return decoded 
    }catch(err){
        console.error( "Error verify token - please provide valid token" )
        return null
    }
}
