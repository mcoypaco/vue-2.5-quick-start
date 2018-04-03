export default {
  namespaced: true,
  strict: true,
  state: {
    url: 'user'
  },
  actions: {
    changePassword ({ state, dispatch }, payload) {
      return dispatch('api/post', { url: `${state.url}/change-password`, payload }, { root: true })
    },

    checkPassword ({ state, dispatch }, payload) {
      return dispatch('api/post', { url: `${state.url}/check-password`, payload }, { root: true })
    }
  }
}
