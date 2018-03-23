// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'mdi/css/materialdesignicons.min.css'

import router from './router'
import store from './store'

import App from './App'
import AppAlertDialog from './components/AppAlertDialog'
import AppConfirmationDialog from './components/AppConfirmationDialog'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('app-alert-dialog', AppAlertDialog)
Vue.component('app-confirmation-dialog', AppConfirmationDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
