export default {
    namespaced: true,
    state(){
        return {
            refreshExpensesNeeded: false
        }
    },
    mutations: {
        SET_REFRESH_NEEDED(state, payload){
            state.refreshExpensesNeeded = payload;
        }
    },
    actions : {
        completeRefresh( ctx,_){
            ctx.commit("SET_REFRESH_NEEDED", false)
        },
        triggeRefreshExpenses(ctx, _){
            ctx.commit("SET_REFRESH_NEEDED", true)
        },
    },
    getters: {
        isRefreshExpensesNeeded( state ){
           return !!state.refreshExpensesNeeded
        }
    }
}