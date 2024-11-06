import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

const AuthPage = () => import("../pages/AuthPage.vue");
const Profile = () => import("../pages/Profile.vue");
const Dashboard = () => import("../pages/Dashboard.vue");
const Budgets = () => import("../pages/Budgets.vue");
const BudgetDetails = () => import("../components/budgets/BudgetDetails.vue");
const BudgetCategories = () =>
  import("../components/budgets/BudgetCategories.vue");
const CategoryExpenses = () =>
  import("../components/budgets/CategoryExpenses.vue");
const Reports = () => import("../pages/Reports.vue");
const Support = () => import("../pages/Support.vue");
const NotFound = () => import("../pages/NotFound.vue");

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedLastPosition) {
    if (savedLastPosition) return savedLastPosition;
    return { left: 0, top: 0 };
  },
  routes: [
    { path: "/", redirect: "/auth?register=true" },
    { path: "/auth", component: AuthPage, meta: { needsAuth: false } },
    { path: "/dashboard", component: Dashboard, meta: { needsAuth: true } },
    {
      meta: {
        needsAuth: true,
      },
      path: "/user",
      props: true,
      children: [
        { path: "profile", component: Profile },
        {
          path: "budgets",
          component: Budgets,
          children: [
            {
              path: ":budgetId",
              props: true,
              name: "budget-details",
              component: BudgetDetails,
              children: [
                {
                  path: "categories",
                  name: "budget-categories",
                  component: BudgetCategories,
                  children: [
                    {
                      path: ":categoryId/expenses",
                      component: CategoryExpenses,
                    },
                  ],
                },
              ],
            },
            { path: "reports", component: Reports },
          ],
        },
      ],
    },
    { path: "/support", component: Support, meta: { needsAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// Guards
router.beforeEach((to, from, next) => {
  store.dispatch("auth/setStateToken");

  // Meta data
  const metaKeys = Object.keys(to.meta);
  if (metaKeys.length && metaKeys.includes("needsAuth")) {
    if (!to.meta.needsAuth && store.getters["auth/isLoggedIn"])
      return next("/dashboard");
    if (to.meta.needsAuth && !store.getters["auth/isLoggedIn"])
      return next("/auth");
  }

  next();
});

export default router;
