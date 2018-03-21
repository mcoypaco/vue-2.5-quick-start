export default {
  methods: {
    setApiAccess (data) {
      localStorage.setItem('apiAccess', JSON.stringify(data))
    },
    getApiAccess () {
      return JSON.parse(localStorage.getItem('apiAccess'))
    },
    logout () {
      // Todo: Revoke token in backend
      // Todo: Revoke user info
      localStorage.removeItem('apiAccess')
      this.$router.push({ path: 'Login' })
    }
  }
}
