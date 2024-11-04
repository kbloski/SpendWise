import { createStore } from "vuex";
import authModule from './auth/index';

const store = createStore({
    modules: {
        auth: authModule
    },
    state(){ return{} },
    mutations: {},
    actions: {},
    getters: {}
})

export default store;