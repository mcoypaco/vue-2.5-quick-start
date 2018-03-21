import Home from '@/components/Home'

import Auth from '../mixins/Auth'

export default {
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (Auth.methods.getApiAccess()) return next()

        next('/login')
      }
    }
  ]
}
