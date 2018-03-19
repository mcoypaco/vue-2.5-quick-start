import AuthLogin from '@/components/AuthLogin'

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: AuthLogin,
      beforeEnter: (to, from, next) => {
        // Todo: redirect user if authenticated
        next()
      }
    }
  ]
}
