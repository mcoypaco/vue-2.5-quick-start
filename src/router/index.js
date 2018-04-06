import Vue from 'vue'
import Router from 'vue-router'

import App from './app'
import Auth from './auth'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    ...App.routes,
    ...Auth.routes,
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
