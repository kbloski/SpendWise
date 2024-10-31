import { ACL } from "../config/acl";
import Roles from "../enum/RolesEnum";

if (!ACL) throw new Error("Check Access error , not found ACL list!")
    
let access = false;
function checkMethod( 
    enteredMethod: string,
    allowedMethods : string | string[]
){
    if (typeof allowedMethods !== 'string') {
        allowedMethods.forEach( method => checkMethod( enteredMethod, method ) )
    }
    else{
        const method : string = allowedMethods.toUpperCase()
        if (method === '*') access = true
        if (enteredMethod === method) access =  true 
    }
    return access
}


export default function checkAccess(
    role: Roles,
    resource: string,
    method: string
){
    const [rolePermissions] = ACL.filter( v => v.role === role);
    if (!rolePermissions) return false;
    const [allows] = rolePermissions.allows.filter(a => a.resource == resource )
    if (!allows) return false;
    
    const allowedMethods : string | string[] = allows.methods
    access = false
    return checkMethod( method, allowedMethods )
}