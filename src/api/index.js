import axios from 'axios'

import env from '../environments'
import Auth from '../mixins/Auth'
import user from './user'

export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      http: ''
    }
  },
  mutations: {
    config (state) {
      state.http = axios.create({
        baseURL: `${env.api.url}/api`,
        headers: { Authorization: `Bearer ${Auth.methods.getAccessToken()}` }
      })
    }
  },
  actions: {
    get ({ state, commit }, url) {
      commit('config')
      return state.http.get(url)
    },
    post ({ state, commit }, { url, payload }) {
      commit('config')
      return state.http.post(url, payload)
    },
    put ({ state, commit }, { url, payload }) {
      commit('config')
      return state.http.put(url, payload)
    },
    delete ({ state, commit }, { url }) {
      commit('config')
      return state.http.delete(url)
    }
  },
  modules: { user }
}
