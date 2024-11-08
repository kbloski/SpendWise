export default {
    getLoading( state, getters){
        return state.fetchGET.loading
    },
    getStatus(){

    },
    getError(state){
        return state.fetchGET.error ?? null;
    },
    getCategories(state, getters, rootState, rootGetters){
        return state.fetchGET.data?.categories ?? []
    }

}