export default {
    setToken( state, payload){
        state.token = payload ?? null;
    },
    deleteToken( state ){
        state.token = null;
    },
    setUser( state, payload){
        state.user = payload ?? null;
    },
    deleteUser( state ){
        state.user = null;
    }
}