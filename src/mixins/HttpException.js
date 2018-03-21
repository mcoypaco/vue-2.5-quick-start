import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      error: null
    }
  },
  methods: {
    ...mapMutations('dialog', [
      'openAlertDialog',
      'openConfirmationDialog'
    ]),
    /**
     * Determine the appropriate action for the error
     *
     * @param error
     */
    handle (error) {
      this.setError(error)

      switch (error.status) {
        case 401:
          return this.unauthenticated()

        case 403:
          return this.unauthorized()

        case 422:
          return this.unprocessable()

        case 500:
          return this.internalServerError()

        default:
          return this.defaultError()
      }
    },

    /**
     * Parse error string if error is not yet an object
     *
     * @param error
     */
    setError (error) {
      if (typeof error !== 'object') error.error = JSON.parse(error.error)
      this.error = error
    },

    defaultError () {
      this.openAlertDialog({
        title: this.error.statusText,
        body: this.error.message
      })
    },

    internalServerError () {
      const body = 'Oops! Something went wrong. Please try again or refresh the page.'
      const actionLabel = 'Send Report'
      const cancelLabel = 'Cancel'

      this.openConfirmationDialog({
        title: this.error.statusText,
        actionLabel,
        body,
        cancelLabel
      })
    },

    unauthenticated () {
      const body = 'Please login to continue.'

      this.openAlertDialog({
        title: this.error.statusText,
        body
      })
    },

    unauthorized () {
      const body = 'This action is unauthorized.'

      this.openAlertDialog({
        title: this.error.statusText,
        body
      })
    },

    unprocessable () {
      const body = 'Please check the form for errors.'

      this.openAlertDialog({
        title: this.error.statusText,
        body
      })
    }
  }
}
