import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authorization: localStorage.getItem('token') || '',
  user: {
    name: localStorage.getItem('user'),
    role: localStorage.getItem('role'),
    id_user: localStorage.getItem('id_user')
  }
}

const getters = {
  getAuthorizationToken: (state) => state.token
}

const mutations = {
  setAuthorizationToken (state, token) {
    localStorage.setItem('token', token)
    state.authorization = token
  },
  setUser (state, user) {
    localStorage.setItem('user', user.name)
    localStorage.setItem('role', user.role)
    localStorage.setItem('id_user', user.id_user)
    state.user.name = user.name
    state.user.role = user.role
    state.user.id_user = user.id_user
  }
}

const actions = {
  setAuthorizationToken ({ commit }, token) {
    commit('setAuthorizationToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
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
