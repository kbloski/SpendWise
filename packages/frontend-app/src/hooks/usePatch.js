import { computed, reactive, ref } from "vue";
import store from "../store/index";

export default function usePatch(
  url = "/",
  headers = {
    "Content-Type": "application/json",
  }
) {
  const fullUrl = ref("");
  setNewUrl(url);

  const default_options = {
    method: "PATCH",
    headers,
    body: null,
  };
  const loading = ref(false);
  const error = ref(null);
  const response = reactive({
    ok: null,
    status: null,
    statusText: null,
  });
  const token = ref(null);

  function setNewUrl(url) {
    fullUrl.value = "http://localhost:8081" + url;
  }

  async function patchData(body, newUrl = fullUrl.value) {
    (loading.value = true), (error.value = null);
    token.value = store.getters["auth/getToken"];

    if (token.value)
      default_options.headers.authorization = "Bearer " + token.value;
    default_options.body = JSON.stringify(body);

    fetch(newUrl, default_options)
      .then((res) => {
        (response.status = res.status), (response.ok = res.ok);
        if (!res.ok) throw new Error(res.statusText);
      })
      .catch((err) => (error.value = err.message))
      .finally(() => (loading.value = false));
  }

  return {
    loading,
    error,
    response,
    patchData,
    setNewUrl,
  };
}
