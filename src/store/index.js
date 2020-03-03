import Vue from 'vue'
import Vuex from 'vuex'
import permission from './model/permission'
import userInfo from './model/userInfo'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    permission: permission,
    userInfo: userInfo,
  },
  plugins: [
    createVuexAlong({
      name: 'PTblog-vuex-along',
      local: {
        list: ['permission', 'userInfo'],
      }
    })]
})
