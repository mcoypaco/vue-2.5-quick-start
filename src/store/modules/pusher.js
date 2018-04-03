import Pusher from 'pusher-js'

import env from '../../environments'
import Auth from '../../mixins/Auth'

export default {
  namespaced: true,
  strict: true,
  state () {
    return {
      pusher: null
    }
  },
  mutations: {
    init (state) {
      Pusher.logToConsole = !env.production && true

      state.pusher = new Pusher(env.pusher.key, {
        authEndpoint: `${env.api.url}/api/pusher/auth`,
        auth: {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${Auth.methods.getAccessToken()}`
          }
        },
        cluster: env.pusher.cluster,
        encrypted: true
      })
    },
    disconnect (state) {
      state.pusher.disconnect()
    }
  },
  actions: {
    subscribe ({ commit, state }) {
      commit('init')

      state.pusher.subscribe(`private-user.${Auth.methods.getUser().id}`)
        .bind('user.change-password', data => sendToLoginPage(commit, state))
        .bind('pusher:subscription_error', status => connectionLost(commit, state))
    }
  }
}

function connectionLost (commit, state) {
  const dialog = {
    title: 'Connection Lost',
    body: 'Please re-login to connect to the server',
    action () {
      state.pusher.disconnect()
      Auth.methods.removeAccessToken()
      Auth.methods.removeUser()
      this.$router.push({ name: 'Login' })
    }
  }

  return commit('dialog/openAlertDialog', dialog, { root: true })
}

function sendToLoginPage (commit, state) {
  const dialog = {
    title: 'Authentication required',
    body: 'Please login to continue.',
    action () {
      state.pusher.disconnect()
      Auth.methods.removeAccessToken()
      Auth.methods.removeUser()
      this.$router.push({ name: 'Login' })
    }
  }

  return commit('dialog/openAlertDialog', dialog, { root: true })
}
