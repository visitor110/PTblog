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

//所有权限
export const constantRouterMap = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/changePassword',
    component: ChangePassword,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/home',
  },
]

//特定权限
export const asyncRouterMap = [
  {
    path: '/test',
    component: Test,
    name: '权限测试',
    meta: {role: ['admin']}, //页面需要的权限
  },
  {
    path: '/createBlog',
    component: Create,
    meta: {role: ['User', 'admin']},
  },
  {path: '*', redirect: '/404', hidden: true}

];

export default new Router({
  routes: constantRouterMap,
  mode: 'history'
})
