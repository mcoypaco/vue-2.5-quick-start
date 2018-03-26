export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      password: '',
      passwordConfirmation: ''
    }
  },
  mutations: {
    setPassword (state, password) {
      state.password = password
    },
    setPasswordConfirmation (state, passwordConfirmation) {
      state.passwordConfirmation = passwordConfirmation
    }
  }
}
