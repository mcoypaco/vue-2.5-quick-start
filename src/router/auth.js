import AuthLogin from '@/components/AuthLogin'

import Auth from '../mixins/Auth'

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: AuthLogin,
      beforeEnter: (to, from, next) => {
        if (Auth.methods.getApiAccess()) return next('/')

        next()
      }
    }
  ]
}
