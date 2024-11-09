import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state(){
        return {
            refreshBudgetsNeeded: false,
            refreshCategoriesNeeded: false,
            refreshExpensesNeeded: false,
            refreshSharesNeeded: false,
        }
    },
    mutations,
    actions,
    getters
}