import { reactive, ref } from "vue";
import { getLocalToken } from "../utils/localStore";
import { backendUrl } from "../config/config";

export default function usePut(
  url = "/",
  headers = {
    "Content-Type": "application/json",
  }
) {
  const fullUrl = ref("");
  setNewUrl(url);

  const default_options = {
    method: "PUT",
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

  function clearResponse() {
    response.ok = null;
    response.status = null;
    response.statusText = null;
    error.value = null;
    loading.value = false;
  }

  function setNewUrl(url) {
    fullUrl.value = backendUrl + url;
  }

  function putData(body, newUrl = fullUrl.value) {
    loading.value = true;
    error.value = null;
    token.value = getLocalToken();

    if (token.value)
      default_options.headers.authorization = "Bearer " + token.value;
    default_options.body = JSON.stringify(body);

    fetch(newUrl, default_options)
      .then((res) => {
        response.ok = res.ok;
        response.status = res.status;
        response.statusText = res.statusText;
        response.ok = res.ok;
        if (!res.ok) throw new Error(res.statusText);
      })
      .catch((err) => (error.value = err.message))
      .finally(() => (loading.value = false));
  }

  return {
    loading,
    error,
    response,
    putData,
    setNewUrl,
    clearResponse,
  };
}
