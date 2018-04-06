export default {
  namespaced: true,
  strict: true,
  state: {
    url: 'user'
  },
  actions: {
    changePassword ({ rootState, state }, payload) {
      return rootState.api.http().post(`${state.url}/change-password`, payload)
    },

    checkPassword ({ rootState, state }, payload) {
      return rootState.api.http().post(`${state.url}/check-password`, payload)
    }
  }
}
