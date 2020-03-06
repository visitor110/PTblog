import {postRequest} from "../../utils/axiosUtils";

export default {
  namespaced: true,
  state: {
    token: '',
    username: '',
    userId: '',
    imgAddress: '',
    roles: [],
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getRoles(state) {
      return state.roles
    },
    getUsername(state) {
      return state.username
    },
    getUserId(state) {
      return state.userId
    },

  },
  mutations: {
    login(state, param) {
      state.token = param.token;
      state.username = param.username;
      state.userId = param.userId;
      state.imgAddress = param.imgAddress;
    },
    setRoles(state, param) {
      state.roles = param
    },
  },
  actions: {
    //通过token获取用户信息
    getInfo({getters,commit}) {
      let url = '/user/getUserInfoByToken'
      let params = {
        "token": getters.getToken
      }
      return new Promise((resolve, reject) => {
        postRequest(url, params).then(resp => {
          let result = resp.data;
          let info = result.data
          console.log("info ", info);
          commit('setRoles',info.roles)
          resolve(info)
        }, resp => {
          this.$alert('服务器维护中', '失败!');
        });
      })
    }
  },
};

