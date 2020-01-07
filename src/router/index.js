import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },

  {
    path: '/login',
    component: Login,
  }
]

export default new Router({
  routes: routes,
  mode: 'history'
})
