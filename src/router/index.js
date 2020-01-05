import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoginForm from '@/components/LoginForm'
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
    component: LoginForm,
  },
]

export default new Router({
  routes: routes,
  mode: 'history'
})
