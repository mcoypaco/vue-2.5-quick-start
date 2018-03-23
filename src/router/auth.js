import AuthLogin from '@/components/AuthLogin'
import Auth from '../mixins/Auth'

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: AuthLogin,
      beforeEnter: (to, from, next) => {
        if (Auth.methods.getAccessToken()) {
          return Auth.methods.verifyAccessToken(Auth.methods.getAccessToken(), () => next({ name: 'Home' }))
        }

        if (to.query.token) {
          return Auth.methods.verifyAccessToken(to.query.token, () => next({ name: 'Home' }))
        }

        next()
      }
    }
  ]
}
