// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

import axios from 'axios';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'

import infiniteScroll from 'vue-infinite-scroll'
import userInfo from "./store/model/userInfo";
import permission from "./store/model/permission";

Vue.use(infiniteScroll)

Vue.config.productionTip = false


let whiteList = [
  '/home',
  '/login',
  '/register',
  '/blog/:id',
  '/changePassword',
]
router.beforeEach((to, from, next) => {
  if (store.getters["userInfo/getToken"]) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/'});
    } else {
      if (store.getters["userInfo/getRoles"].length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('userInfo/getInfo').then(res => { // 拉取info
          const roles = store.getters["userInfo/getRoles"];
          console.log("roles", roles);
          store.dispatch('permission/generateRoutes', {roles}).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters["permission/getAddRouters"]) // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    console.log("no token")
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  //由于chrome调试
  // mounted() {
  //   window.vue = this
  // }
})
