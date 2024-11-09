export default {
  triggerRefreshBudgets(ctx, _) {
    ctx.commit("SET_REFRESH__BUDGETS_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__BUDGETS_NEEDED", false), 0);
  },

  triggerRefreshCategories(ctx, _) {
    ctx.commit("SET_REFRESH__CATEGORIES_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__CATEGORIES_NEEDED", false), 0);
  },

  triggerRefreshExpenses(ctx, _) {
    ctx.commit("SET_REFRESH__EXPENSES_NEEDED", true);
    setTimeout(() => ctx.commit("SET_REFRESH__EXPENSES_NEEDED", false), 0);
  },
};
