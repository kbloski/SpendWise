import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js';
import AuthPage from "../pages/AuthPage.vue";
import Dashboard from '../pages/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/' , redirect : '/auth?register=true'},
    { path: '/auth', component: AuthPage },
    { path: "/user", component: Dashboard}
  ]
})

router.beforeEach( (to, from, next)=>{
  store.dispatch("auth/setStateToken");
  if ( to.path === '/auth' && store.getters['auth/isLoggedIn']) return next('/user');
  next()
});

export default router;