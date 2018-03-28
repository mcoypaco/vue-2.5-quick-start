export default {
  index ({ rootState, state }) {
    return rootState.api.http.get(state.url)
  },

  show ({ rootState, state }, id) {
    return rootState.api.http.get(`${state.url}/${id}`)
  },

  store ({ rootState, state }, data) {
    return rootState.api.http.post(state.url, data)
  },

  update ({ rootState, state }, id, data) {
    return rootState.api.http.put(`${state.url}/${id}`, data)
  },

  destroy ({ rootState, state }, id) {
    return rootState.api.http.delete(`${state.url}/${id}`)
  }
}
