export enum UserRoles {
    'ADMIN',
    "EDYTOR"
}

type BudgetShareType = {
    id: number;
    fk_budget_id: number;
    fk_user_id: number;
    role: UserRoles;
};


export default BudgetShareType