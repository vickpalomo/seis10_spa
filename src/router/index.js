import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CarView from '@/views/Home/CarView'
import MapView from '@/views/Home/MapView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home, // Vista de esa ruta
    meta: {
      requiresAuth: true
    },
    redirect: '/home/cars',
    children: [
      {
        path: 'cars',
        name: 'Cars',
        component: CarView
      },
      {
        path: 'maps',
        name: 'Maps',
        component: MapView
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, // Vista de esa ruta
    meta: {
      requiresAuth: false
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') !== null) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        path: '/login'
      })
    }
    next()
  }
  next()
})

export default router
