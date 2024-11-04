import { lsTokenKey } from "../../config/config.js";

export default {
  async getUser(state, getters, rootState, rootGetters) {
    const response = await fetch("http://localhost:8081/api/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${getters.getToken}` },
    });
    if (!response.ok) return null;

    return (await response.json()).user;
  },
  getToken(state) {
    return localStorage.getItem(lsTokenKey);
  },
  isLoggedIn(state, getters) {
    return !!state.token;
  },
};
