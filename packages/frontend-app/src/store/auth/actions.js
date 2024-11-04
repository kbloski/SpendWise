export default {
    async setToken(ctx, payload){
        // const response = await fetch('http://localhost:8081/api/users/me');
        // if (!response.ok) return;

        // ctx.commit('setUser', await response.json());
        ctx.commit("setToken", payload);
    },

}