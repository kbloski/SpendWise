export default {
  isRefreshBudgetsNeeded(state) {
    return !!state.refreshBudgetsNeeded;
  },
  isRefreshCategoriesNeeded(state) {
    return !!state.refreshCategoriesNeeded;
  },
  isRefreshExpensesNeeded(state) {
    return !!state.refreshExpensesNeeded;
  },
  isRefreshSharesNeeded(state) {
    return !!state.refreshSharesNeeded;
  },
};
