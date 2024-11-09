import { computed, reactive, ref, watch } from "vue";
import { getLocalToken } from "../utils/localStore.js";
import store from "../store/index.js";

export default function usePost(
  url = "/",
  headers = {
    "Content-Type": "application/json",
  }
) {
  const fullUrl = ref("");
  setNewUrl(url);

  const default_options = {
    method: "POST",
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
  const data = ref(null);
  const token = ref(null);

  function clearResponse() {
    response.ok = null;
    response.status = null;
    response.statusText = null;
    error.value = null;
    loading.value = false;
    data.value = null;
  }

  function setNewUrl(url) {
    fullUrl.value = "http://localhost:8081" + url;
  }

  function postData(body, newUrl = fullUrl.value) {
    loading.value = true;
    error.value = null;
    default_options.body = null;

    token.value = store.getters["auth/getToken"];
    if (token.value)
      default_options.headers.authorization = `Bearer ${token.value}`;
    default_options.body = JSON.stringify(body);

    fetch(newUrl, default_options)
      .then((res) => {
        response.ok = res.ok;
        response.status = res.status;
        response.statusText = res.statusText;
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((d) => (data.value = d))
      .catch((err) => (error.value = err.message))
      .finally(() => (loading.value = false));
  }

  return {
    loading,
    data,
    error,
    response,
    clearResponse,
    postData,
    setNewUrl,
  };
}
