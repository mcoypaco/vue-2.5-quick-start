import axios from 'axios'

import env from '../environments'

export default {
  namespaced: true,
  strict: true,
  state: {
    http: axios.create({
      baseURL: `${env.api.url}/api`
    })
  }
}
