import Vue from 'vue'
import Vuex from 'vuex'
import permission from './model/permission'
import userInfo from './model/userInfo'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    permission,
    userInfo
  }
})
