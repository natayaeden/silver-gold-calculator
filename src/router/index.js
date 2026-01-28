import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guest: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/Calculator.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isLoggedIn() {
  return !!sessionStorage.getItem('goldCalcUser')
}

router.beforeEach((to, _from, next) => {
  const auth = isLoggedIn()
  if (to.meta.requiresAuth && !auth) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && auth && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'Calculator' })
  } else {
    next()
  }
})

export default router
