import { createStore } from "vuex";
import authModule from './auth/index';
import categoryModule from './categories/index'
import refreshFetchesModule from './refresh/index'

const store = createStore({
    modules: {
        auth: authModule,
        categories: categoryModule,
        refresh: refreshFetchesModule
    },
    state(){ return{} },
    mutations: {},
    actions: {},
    getters: {}
})

export default store;