export default {
    setGetUrlWithBudgetId(state, payload){
        state.fetchGET.setNewUrl(`/api/budgets/${payload}/categories`);
    },
    refetchGet(state, _){
        state.fetchGET.refetch()
    },
};
