export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      route: ''
    }
  },
  mutations: {
    setRoute (state, route) {
      state.route = route
    }
  }
}
