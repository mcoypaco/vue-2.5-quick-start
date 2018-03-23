import axios from 'axios'

import env from '../environments'
import HttpException from './HttpException'

export default {
  methods: {
    setAccessToken (data) {
      localStorage.setItem('accessToken', data)
    },
    getAccessToken () {
      return localStorage.getItem('accessToken')
    },
    // Todo: Store the user in vuex instead
    setUser (data) {
      localStorage.setItem('user', JSON.stringify(data))
    },
    getUser () {
      return JSON.parse(localStorage.getItem('user'))
    },
    verifyAccessToken (token, redirectFn) {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return api.get(`${env.api.url}/api/user`)
        .then(({ data }) => {
          this.setAccessToken(token)
          this.setUser(data)
          redirectFn()
        })
        .catch(({ response }) => HttpException.methods.handle(response))
    },
    logout () {
      const api = axios.create({
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      })

      return api.post(`${env.api.url}/api/logout`)
    }
  }
}
