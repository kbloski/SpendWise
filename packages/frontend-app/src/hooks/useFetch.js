import { computed, reactive, ref, watch } from "vue";
import store from '../store/index.js'

export default function useFetch(
  url = "/",
  headers =  {},
) {
    const fullUrl = computed(() => "http://localhost:8081" + url);
    const default_options = {
        method : "GET",
        headers,
    }

    const loading = ref(false);
    const error = ref(null);
    const data = ref(null)
    const response = reactive({
        ok: null,
        status: null,
        statusText: null,
    });


    async function fetchData(){
      loading.value = true;
      const token = store.getters['auth/getToken'];
      if (token) default_options.headers.authorization = `Bearer ${token}`

      fetch( 
        fullUrl.value,
        default_options
      )
      .then(
        res => {
          if (!res.ok) throw new Error( res.statusText);
          return res.json()
        }
      )
      .then( dat => data.value = dat )
      .catch( err => error.value = err.message )
      .finally( () => loading.value = false)
    }

  fetchData(); // First fetch
  watch([fullUrl], () => fetchData());

  return {
    data,
    loading,
    response,
    error,
  };
}
