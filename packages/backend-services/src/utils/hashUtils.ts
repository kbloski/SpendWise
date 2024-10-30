import bcrypt from 'bcrypt'
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) ?? 10;
const GEN_SALT = bcrypt.genSaltSync( saltRounds );

export async function hashString( value : string){
    return bcrypt.hash(value, GEN_SALT)
}

export async function compareString( value : string, hashedValue : string){
    return await bcrypt.compare( value, hashedValue)
}