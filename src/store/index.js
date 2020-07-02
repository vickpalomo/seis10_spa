import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authorization: localStorage.getItem('token') || ''
}

const getters = {
  getAuthorizationToken: (state) => state.token
}

const mutations = {
  setAuthorizationToken (state, token) {
    localStorage.setItem('token', token)
    state.authorization = token
  }
}

const actions = {
  setAuthorizationToken ({ commit }, token) {
    commit('setAuthorizationToken', token)
  }
}

export default new Vuex.Store({
  // Variables globales en su valor inicial
  state,
  getters,
  // Alterar el valor del state
  mutations,
  // Lamar al mutation
  actions,
  // Segmentar el store y las variables
  modules: {
  }
})
