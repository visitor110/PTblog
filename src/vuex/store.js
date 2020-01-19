import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'aaa',
    user: ''
  },
  mutations: {
    changeToken(state, param) {
      state.token = param.token;
    }
  },
  actions: {},

})
