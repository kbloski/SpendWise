export default {
  SET_REFRESH__BUDGETS_NEEDED(state, payload) {
    state.refreshBudgetsNeeded = payload;
  },
  SET_REFRESH__CATEGORIES_NEEDED(state, payload) {
    state.refreshCategoriesNeeded = payload;
  },
  SET_REFRESH__EXPENSES_NEEDED(state, payload) {
    state.refreshExpensesNeeded = payload;
  },
  SET_REFRESH__SHARES_NEEDED(state, payload) {
    state.refreshSharesNeeded = payload;
  },
};
