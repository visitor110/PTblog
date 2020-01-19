// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

import axios from 'axios';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

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
