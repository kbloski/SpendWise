import Roles from "../enum/RolesEnum";
import ACLpermissionType from "../types/ACLpermissionType";
import { buildApiPath } from "../utils/apiUtils";

const ACL : ACLpermissionType[] = [
    { 
        role: Roles.GUEST,
        allows: [ 
            { 
                resource: buildApiPath('register'),
                methods: "POST"
            },
            { 
                resource: buildApiPath('login'),
                methods: 'POST'
            },
        ]
    },
    {
        role: Roles.VIEWER,
        allows: [
            {
                resource: '',
                methods: '*'
            }
        ]
    }

    

]