import { computed, reactive, ref, watch } from "vue";

export default function useApi(
  url = "/",
  method = "GET",
  headers =  null,
) {
    const fullUrl = computed(() => "http://localhost:8081/api" + url);
    const default_options = {
        method,
        headers,
        body: null
    }
    const loading = ref(false);
    const error = ref(null);
    const response = reactive({
        ok: null,
        status: null,
        statusText: null,
    });




//   function postData(body = null) {
//     loading.value = true;
//     try {
//       fetch(fullUrl.value, { ...op })
//         .then((res) => {
//           (response.status = res.status), (response.ok = res.ok);
//           response.statusText = res.statusText;

//           if (!res.ok) {
//             throw new Error(res.status + " " + res.statusText);
//           }
//           return res.json();
//         })
//         .then((resData) => {
//           console.log(resData);
//           data.value = resData;
//         })
//         .catch((err) => (error.value = err.message))
//         .finally(() => (loading.value = false));
//     } catch (err) {}
//   }

//   fetchData(); // First fetch
//   watch([fullUrl], () => fetchData());

  return {
    data,
    loading,
    response,
    error,
    post: (body) => postData(),
  };
}
