import { createRouter, createWebHistory } from "vue-router";
import Register from "../pages/RegisterPage.vue";
import store from '../store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/' , redirect : '/auth?register=true'},
    { path: '/auth', component: Register}
  ]
})

router.beforeEach( (to, from, next)=>{
  console.log( store.getters['auth/isLoggedIn'])
  next()
});

export default router;