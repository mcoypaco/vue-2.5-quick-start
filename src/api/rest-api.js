export default {
  index ({ rootState, state }) {
    return rootState.api.http.get(state.url)
  },

  show ({ rootState, state }, { id }) {
    return rootState.api.http.get(`${state.url}/${id}`)
  },

  store ({ rootState, state }, payload) {
    return rootState.api.http.post(`${state.url}`, payload)
  },

  update ({ rootState, state }, { id, payload }) {
    return rootState.api.http.put(`${state.url}/${id}`, payload)
  },

  destroy ({ rootState, state }, { id }) {
    return rootState.api.http.delete(`${state.url}/${id}`)
  }
}
