export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      dialog: false,
      title: '',
      body: '',
      action: null,
      actionLabel: '',
      cancel: null,
      cancelLabel: ''
    }
  },
  mutations: {
    openAlertDialog (state, { title, body, action, actionLabel }) {
      state.title = title
      state.body = body
      state.actionLabel = actionLabel || 'Got it!'
      state.action = action
      state.dialog = true
    },
    openConfirmationDialog (state, { title, body, action, actionLabel, cancelLabel }) {
      state.title = title
      state.body = body
      state.actionLabel = actionLabel
      state.cancelLabel = cancelLabel
      state.action = action
      state.dialog = true
    },
    closeDialog (state) {
      state.dialog = false
    }
  }
}
