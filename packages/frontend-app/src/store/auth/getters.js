export default {
    getUser( state, getters, rootState, rootGetters ){
        return state.user;
    },
    getToken( state){
        return state.token
    },
    isLoggedIn( state, getters ){
        return !!getters.getToken
    }
}