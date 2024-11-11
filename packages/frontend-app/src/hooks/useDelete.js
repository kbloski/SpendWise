import { reactive, ref, watch } from "vue";
import { getLocalToken } from "../utils/localStore";
import { backendUrl } from "../config/config";

export default function useDelete(url = null, headers = {}) {
  const fullUrl = ref("");
  setNewUrl(url);

  const default_options = {
    method: "DELETE",
    headers,
  };

  const loading = ref(false);
  const error = ref(null);
  const response = reactive({
    ok: null,
    status: null,
    statusText: null,
  });

  function setNewUrl(url) {
    fullUrl.value = backendUrl + url;
  }

  function clearResponse() {
    response.ok = null;
    response.status = null;
    response.statusText = null;
    error.value = null;
    loading.value = false;
  }

  async function deleteData() {
    loading.value = true;

    const token = getLocalToken();

    if (token) default_options.headers.authorization = `Bearer ${token}`;

    fetch(fullUrl.value, default_options)
      .then((res) => {
        response.ok = res.ok;
        response.status = res.status;
        response.statusText = res.statusText;
        if (!res.ok) throw new Error(res.statusText);
      })
      .catch((err) => (error.value = err.message))
      .finally(() => (loading.value = false));
  }

  if (url) deleteData(); // First fetch
  watch([fullUrl], () => deleteData());

  return {
    loading,
    response,
    error,
    refetch: () => deleteData(),
    setNewUrl,
    clearResponse,
  };
}
