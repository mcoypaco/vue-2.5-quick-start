import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('snackbar', [ 'showSnackbar' ]),
    simpleNotification (message) {
      this.showSnackbar({ message })
    }
  }
}
