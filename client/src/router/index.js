import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    components: {
      // header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoPwc.first_name) {
        next()
      } else {
        next('/Home')
      }
    }
  },
  {
    path: '/Home',
    name: 'Home',
    components: {
      header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
    },    
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoPwc.first_name) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/sidSettings',
    name: 'SID Settings',
    components: {
      header: () => import(/* webpackChunkName: "Header" */ '../components/Header.vue'),
      default: () => import(/* webpackChunkName: "About" */ '../views/suidSettings.vue')
    },
    
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfoPwc.first_name) {
        next('/')
      } else {
        next()
      }
    }
  },
  { 
    path: "*", 
    beforeEnter: (to, from, next) => {
        next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
