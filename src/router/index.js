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
          component: () => import('../views/Employee/Employee.vue'),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('role') !== 'SUPER-ADMIN') {
              next({ name: "error" });
            } else {
              next();
            }
          }
        },
        {
          path: '/types',
          name: 'product-types',
          component: () => import('../views/Product/ProductType.vue')
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
          component: () => import('../views/Contact/Contact.vue'),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('role') !== 'SUPER-ADMIN' && localStorage.getItem('role') !== 'OPERATOR') {
              next({ name: "error" });
            } else {
              next();
            }
          }
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

router.beforeEach((to, from, next) => {


  let token = localStorage.getItem('token')

  if (to.name !== "login" && !token) {
    next({ name: 'login' })
  } else {
    next()
  }

})

export default router
