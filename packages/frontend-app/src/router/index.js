import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../pages/AuthPage.vue";
import store from '../store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/' , redirect : '/auth?register=true'},
    { path: '/auth', component: AuthPage }
  ]
})

router.beforeEach( (to, from, next)=>{
  store.dispatch("auth/setStateToken");
  if ( to.path === '/auth' && store.getters['auth/isLoggedIn']) return next('/');

  next()
});

export default router;