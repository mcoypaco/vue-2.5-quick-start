import Home from '@/components/Home'

import Auth from '../mixins/Auth'

export default {
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (Auth.methods.getAccessToken()) {
          return Auth.methods.verifyAccessToken(Auth.methods.getAccessToken(), () => next())
        }

        next('/login')
      }
    }
  ]
}
