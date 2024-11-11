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
                methods: ["POST", "GET"],
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
                methods: ["POST", "GET"],
            },
            {
                resource: buildApiPath("budgets", ":budgetId", "expenses"),
                methods: ["GET"],
            },
            {
                resource: buildApiPath("expenses", ":id"),
                methods: ["GET", "PATCH", "DELETE"],
            },
            {
                resource: buildApiPath("budgets", ":id", "shares"),
                methods: ["GET", "PUT"],
            },
            {
                resource: buildApiPath("budgets", ":id", "shares", ":userId"),
                methods: ["DELETE"],
            },
            {
                resource: buildApiPath("budgets", ":id", "reports"),
                methods: ["GET"],
            },
            {
                resource: buildApiPath("reports", "all"),
                methods: ["GET"],
            },
            {
                resource: buildApiPath("reports", ":id"),
                methods: ["DELETE"],
            },
            {
                resource: buildApiPath("roles"),
                methods: ["GET"],
            },
        ],
    },
];
