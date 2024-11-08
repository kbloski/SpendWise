import { createStore } from "vuex";
import authModule from './auth/index';
import refreshFetchesModule from './refresh/index'

const store = createStore({
    modules: {
        auth: authModule,
        refresh: refreshFetchesModule
    },
    state(){ return{} },
    mutations: {},
    actions: {},
    getters: {}
})

export default store;