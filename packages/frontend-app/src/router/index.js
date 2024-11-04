import { createRouter, createWebHistory } from "vue-router";
import Register from "../pages/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/' , redirect : '/auth?register=true'},
    { path: '/auth', component: Register}
  ]
})


export default router;