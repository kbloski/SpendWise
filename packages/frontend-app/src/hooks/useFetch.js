import { ref, reactive, watch } from "vue";

export default async function useFetch(
  url,
  requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   "authorization" : 'Bearer'
    },
    body: {},
  }
) {
    const url = ref(url);
    let loading = ref(false)

    const res = reactive({
        data: null,
        status: null,
        ok: null
    })

    watch(url, ()=>{
        loading.value = true;

        fetch(url, requestInit)
        .then( response => {
            res.data = response.json();
            res.status = response.status;
            res.ok = response.ok;

            loading.value = false;
        })
    })

    return {
        loading,
        response : res
    }
}
