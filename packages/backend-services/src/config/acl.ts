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
                resource: buildApiPath("budgets", "me"),
                methods: ["GET", "POST"],
            },
            {
                resource: buildApiPath("budgets", ":id"),
                methods: ["GET", "PATCH", "DELETE"],
            },
            {
                resource: buildApiPath("budgets", ":id", "summary"),
                methods: ["GET"],
            },
            {
                resource: buildApiPath("budgets", ":budgetId", "categories"),
                methods: ["POST"],
            },
            {
                resource: buildApiPath("categories", ":id"),
                methods: ["GET", "PATCH", "DELETE"],
            },
            {
                resource: buildApiPath(
                    "budgets",
                    ":budgetId",
                    "categories",
                    ":categoryId",
                    "expenses"
                ),
                methods: ["POST"],
            },
            {
                resource: buildApiPath(
                    "budgets",
                    ":budgetId",
                    "expenses"
                ),
                methods: ["GET"],
            },
        ],
    },
];