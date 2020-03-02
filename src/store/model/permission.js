import {constantRouterMap, asyncRouterMap} from "@/router";

function hasPermission(roles, route) {

  if (route.meta && route.meta.role) {
    roles.some(role => console.log(role))
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  getters:{
    getAddRouters(state){
      return state.addRouters
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    generateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  console.log("child",child);
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

