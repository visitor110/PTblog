import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/views/login'
import Register from '@/views/register'
import Create from '@/components/user/createBlog'
import Test from '@/components/test'
import Blog from '@/views/blog'
import ChangePassword from '@/views/changePassword'

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
    path: '/createBlog',
    component: Create,
  },
  {
    path: '/test',
    component: Test,
  },
  {
    path: '/blog/:id',
    component: Blog,
  },
  {
    path: '/changePassword',
    component: ChangePassword,
  },
]

export default new Router({
  routes: routes,
  mode: 'history'
})
