import { lsTokenKey } from "../../config/config.js";

export default {
  getToken(state) {
    return localStorage.getItem(lsTokenKey);
  },
  isLoggedIn(state, getters) {
    return !!state.token;
  },
};
