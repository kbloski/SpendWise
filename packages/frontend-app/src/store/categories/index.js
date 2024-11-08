import actions from "./actions.js";
import mutations from './mutations.js';
import getters from "./getters.js";
import useFetch from "../../hooks/useFetch.js";

export default {
    namespaced: true,
    state(){
        return {
            fetchGET: useFetch()
        }
    },
    mutations,
    actions,
    getters
}