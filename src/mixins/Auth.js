import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

import env from '../environments'

export default {
  computed: {
    ...mapState('pusher', ['pusher'])
  },
  methods: {
    ...mapMutations('pusher', ['disconnect']),
    setAccessToken (data) {
      localStorage.setItem('accessToken', data)
    },
    getAccessToken () {
      return localStorage.getItem('accessToken')
    },
    removeAccessToken () {
      localStorage.removeItem('accessToken')
    },
    setUser (user) {
      localStorage.setItem('user', JSON.stringify(user))
    },
    getUser () {
      return JSON.parse(localStorage.getItem('user'))
    },
    removeUser () {
      localStorage.removeItem('user')
    },
    attemptLogin () {
      return axios
        .post(`${env.api.url}/oauth/token`, {
          grant_type: 'password',
          client_id: env.api.client_id,
          client_secret: env.api.client_secret,
          username: this.email,
          password: this.password
        })
        .then(({ data }) => this.storeTokenAndRedirect(data.access_token))
    },
    storeTokenAndRedirect (token) {
      this.setAccessToken(token)
      this.$router.push({ name: 'Home' })
    },
    flush () {
      this.removeAccessToken()
      this.removeUser()
      if (this.pusher) this.disconnect()
      this.$router.push({ name: 'Login' })
    },
    verifyAccessToken (token, redirectFn) {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return api.post(`${env.api.url}/api/user/auth`)
        .then(({ data }) => {
          this.setAccessToken(token)
          this.setUser(data)
          redirectFn()
        })
        .catch(({ response }) => this.flush())
    },
    logout () {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      })

      return api
        .post(`${env.api.url}/api/logout`)
        .then(resp => this.flush())
        .catch(({ response }) => this.handle(response))
    }
  }
}
