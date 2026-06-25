import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../stores/auth';
import CategoryView from '../views/CategoryView.vue';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';
import ProductView from '../views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/products', component: ProductView, meta: { requiresAuth: true } },
    { path: '/categories', component: CategoryView, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login';
  }
  if (to.path === '/login' && auth.isAuthenticated) {
    return '/';
  }
  return true;
});

export default router;
