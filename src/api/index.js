import axios from 'axios'

import env from '../environments'
import Auth from '../mixins/Auth'
import user from './user'

export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      http () {
        return axios.create({
          baseURL: `${env.api.url}/api`,
          headers: { Authorization: `Bearer ${Auth.methods.getAccessToken()}` }
        })
      }
    }
  },
  modules: { user }
}
