import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
  state: {
    token: '',
    userinfo: {
      userName: '',
      deptName: '',
      loginId: ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
