import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'aaa',
    username: '',
    userId: ''
  },
  mutations: {
    login(state, param) {
      state.token = param.token;
      state.username = param.username;
      state.userId = param.userId;
    },
    changeToken(state, param) {

    },
    changeUser(state, param) {

    }
  },
  actions: {},

})
