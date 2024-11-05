import { computed, reactive, ref, watch } from "vue";
import { getLocalToken} from '../utils/localStore.js'
import store from "../store/index.js";

export default function usePost(
    url = '/',
    headers = {
        "Content-Type" : 'application/json'
    }
){
    const fullUrl = computed( ()=> 'http://localhost:8081' + url);
    const default_options = {
        method: "POST",
        headers,
        body: null
    }
    const loading = ref(false);
    const error = ref(null);
    const response = reactive({
        ok: null,
        status: null,
        statusText: null
    });
    const data = ref(null)
    const token = ref(null)

    async function postData( body , newUrl = fullUrl.value){
        loading.value = true;
        error.value = null;
       
        
        token.value = store.dispatch('auth/getToken')
        if (token.value) default_options.headers.authorization = `Bearer ${token.value}`;
        default_options.body = JSON.stringify( body );

        await fetch(
            newUrl,
            default_options,
        )
        .then( res => {
            response.status = res.status,
            response.ok = res.ok
            if (!res.ok) throw new Error( res.statusText);
            return res.json()
        })
        .then( d => data.value = d)
        .catch( err => error.value = err.message)
        .finally( () => loading.value = false)
    }

    return {
      loading,
      data,
      error,
      response,
      postData,
    };
}