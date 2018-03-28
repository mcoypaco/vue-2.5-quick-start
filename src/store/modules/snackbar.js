export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      'timeout': null,
      'top': '',
      'bottom': '',
      'right': '',
      'left': '',
      'multiLine': '',
      'vertical': '',
      'snackbar': '',
      'color': '',
      'message': '',
      'closeLabel': ''
    }
  },
  mutations: {
    setDefault (state) {
      state.timeout = 6000
      state.top = document.documentElement.clientWidth <= 960 || false
      state.bottom = document.documentElement.clientWidth >= 960 || false
      state.right = true
      state.left = false
      state.multiLine = document.documentElement.clientWidth <= 960 || false
      state.vertical = document.documentElement.clientWidth <= 960 || false
      state.snackbar = false
      state.color = ''
      state.snackbar = false
      state.closeLabel = 'Close'
      state.message = ''
    },
    setSnackbar (state, config) {
      for (const key in config) {
        if (state.hasOwnProperty(key)) state[key] = config[key]
      }

      state.snackbar = true
    }
  },
  actions: {
    showSnackbar (context, config) {
      context.commit('setDefault')
      context.commit('setSnackbar', config)
    },
    closeSnackbar (context) {
      context.commit('setDefault')
    }
  }
}
