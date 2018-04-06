import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'
import core from './modules/core'
import dialog from './modules/dialog'
import passwordConfirmation from './modules/password-confirmation'
import pusher from './modules/pusher'
import snackbar from './modules/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    core,
    dialog,
    passwordConfirmation,
    pusher,
    snackbar
  }
})
