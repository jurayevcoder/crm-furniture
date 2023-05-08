import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/employee',
          name: 'employee',
          component: () => import('../views/Employee/Employee.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('../views/Product/Product.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../views/Order/Order.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../views/Contact/Contact.vue')
        },
        {
          path: '/region',
          name: 'region',
          component: () => import('../views/Region/Region.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error/Error.vue')
    }
  ]
})

export default router
