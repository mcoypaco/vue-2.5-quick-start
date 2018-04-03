export default {
  index ({ dispatch, state }) {
    return dispatch('api/get', { url: state.url }, { root: true })
  },

  show ({ dispatch, state }, { id }) {
    return dispatch('api/get', { url: `${state.url}/${id}` }, { root: true })
  },

  store ({ dispatch, state }, payload) {
    return dispatch('api/post', { url: `${state.url}`, payload }, { root: true })
  },

  update ({ dispatch, state }, { id, payload }) {
    return dispatch('api/post', { url: `${state.url}/${id}`, payload }, { root: true })
  },

  destroy ({ dispatch, state }, { id }) {
    return dispatch('api/get', { url: `${state.url}/${id}` }, { root: true })
  }
}
