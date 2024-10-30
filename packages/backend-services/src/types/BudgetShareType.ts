export enum UserRoles {
    "ADMIN",
    "EDITOR",
    "VIEWER",
}

type BudgetShareType = {
    id: number;
    budget_id: number;
    user_id: number;
    role: UserRoles;
};

export default BudgetShareType;
