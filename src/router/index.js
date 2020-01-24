import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/register'
import Create from '@/components/user/CreateArticle'
import Test from '@/components/Test'

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
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/createArticle',
    component: Create,
  },
  {
    path: '/test',
    component: Test,
  },
]

export default new Router({
  routes: routes,
  mode: 'history'
})
