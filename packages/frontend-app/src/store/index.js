import { createStore } from "vuex";
import authModule from './auth/index';
import categoryModule from './categories/index'

const store = createStore({
    modules: {
        auth: authModule,
        categories: categoryModule
    },
    state(){ return{} },
    mutations: {},
    actions: {},
    getters: {}
})

export default store;