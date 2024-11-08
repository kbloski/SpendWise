export default {
    namespaced: true,
    state(){
        return {
            refreshExpensesNeeded: false,
        }
    },
    mutations: {
        SET_REFRESH_NEEDED(state, payload){
            state.refreshExpensesNeeded = payload;
        }
    },
    actions : {
        triggeRefreshExpenses(ctx, _){
            ctx.commit("SET_REFRESH_NEEDED", true)

            setTimeout(
                () => ctx.commit("SET_REFRESH_NEEDED", false), 1
            );
        },
    },
    getters: {
        isRefreshExpensesNeeded( state ){
           return !!state.refreshExpensesNeeded
        }
    }
}