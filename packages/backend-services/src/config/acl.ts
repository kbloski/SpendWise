import Roles from "../enum/RolesEnum";
import ACLpermissionType from "../types/ACLpermissionType";
import { UserRoles } from "../types/BudgetShareType";
import { buildApiPath } from "../utils/apiUtils";

export const ACL: ACLpermissionType[] = [
    {
        role: Roles.GUEST,
        allows: [
            {
                resource: "/",
                methods: "*",
            },
            {
                resource: buildApiPath("register"),
                methods: ["POST"],
            },
            {
                resource: buildApiPath("login"),
                methods: ["POST"],
            },
        ],
    },
    {
        role: Roles.USER,
        allows: [
            {
                resource: buildApiPath("users", "me"),
                methods: ["GET", "PATCH", "DELETE"],
            },
            {
                resource: buildApiPath("budgets"),
                methods: ["GET", "POST"]
            },
        ],
    },
];