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
    const [allows] = rolePermissions.allows.filter( (a) => {
       if ( a.resource == resource) return a

        // For custom links with dynamic property :id etc    
        else if ( a.resource.indexOf(':') >= 0 ){
            const aResourceElement = a.resource.split('/')
            const resourceElement = resource.split('/')

            // Check url length elements
            if (aResourceElement.length !== resourceElement.length) return;
            
            const newUrlA : string[] = []
            const newUrlB : string[] = []
            for(const [index, el] of aResourceElement.entries()){
                if (el.includes(':')) {
                    newUrlA.push( '_' )
                    newUrlB.push( '_' )
                }
                else {
                    newUrlA.push( aResourceElement[index ] )
                    newUrlB.push( resourceElement[index] )
                }
            }
            if ( newUrlA.join('/') === newUrlB.join('/')) return a
       }
    
    } )
    if (!allows) return false;
    
    const allowedMethods : string | string[] = allows.methods
    access = false
    return checkMethod( method, allowedMethods )
}