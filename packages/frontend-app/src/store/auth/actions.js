import { lsTokenKey } from "../../config/config.js";

export default {
  async setToken(ctx, payload) {
    localStorage.setItem(lsTokenKey, payload);
    ctx.commit("setToken", payload);
  },

  setStateToken(ctx) {
    const token = localStorage.getItem(lsTokenKey);
    ctx.commit("setToken", token ?? null);
  },

  logOut(){
    localStorage.removeItem( lsTokenKey)
  }
};
