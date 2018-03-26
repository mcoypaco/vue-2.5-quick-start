import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'
import dialog from './modules/dialog'
import passwordConfirmation from './modules/password-confirmation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    dialog,
    passwordConfirmation
  }
})
