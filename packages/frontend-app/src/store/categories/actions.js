export default {
  setFetchWithBudgetId(ctx, payload) {
    ctx.commit("setGetUrlWithBudgetId", payload);
  },
  refreshFetchGet(ctx, _) {
    ctx.commit("refetchGet");
  },
};
