import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderSelected: ""
  },
  mutations: {
    setOrderSelected(state, payload) {
      state.orderSelected = payload;
    },
    
  },
  actions: {
  },
  modules: {
  }
})
