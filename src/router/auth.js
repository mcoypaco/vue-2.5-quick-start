import Auth from '../mixins/Auth'
const AuthLogin = () => import('../components/AuthLogin')
const AuthPasswordReset = () => import('../components/AuthPasswordReset')
const AuthRegister = () => import('../components/AuthRegister')

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: AuthLogin,
      beforeEnter: (to, from, next) => redirectUserIfAuthenticated(to, from, next)
    },
    {
      path: '/register',
      name: 'Register',
      component: AuthRegister,
      beforeEnter: (to, from, next) => redirectUserIfAuthenticated(to, from, next)
    },
    {
      path: '/password/reset',
      name: 'PasswordReset',
      component: AuthPasswordReset,
      beforeEnter: (to, from, next) => redirectUserIfAuthenticated(to, from, next)
    }
  ]
}

function redirectUserIfAuthenticated (to, from, next) {
  if (Auth.methods.getAccessToken()) {
    return Auth.methods.verifyAccessToken(Auth.methods.getAccessToken(), () => next({ name: 'Home' }))
  }

  if (to.query.token) {
    return Auth.methods.verifyAccessToken(to.query.token, () => next({ name: 'Home' }))
  }

  next()
}
