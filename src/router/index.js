import { createRouter, createWebHistory } from 'vue-router';
import UnitSubmission from '../views/UnitSubmission.vue';  // Ensure this file exists
import BrigadeDashboard from '../views/BrigadeDashboard.vue';  // Ensure this file exists
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    // component: () => import('../views/Home.vue')
  },
  { path: '/unit', name: 'UnitSubmission', component: UnitSubmission },
  { path: '/brigade', name: 'BrigadeDashboard', component: BrigadeDashboard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;