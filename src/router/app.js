import Auth from '../mixins/Auth'

const Home = () => import('../components/Home')
const AuthChangePassword = () => import('../components/AuthChangePassword')

export default {
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => redirectIfNotLoggedIn(next, () => next())
    },
    {
      path: '/change-password',
      name: 'Change Password',
      component: AuthChangePassword,
      beforeEnter: (to, from, next) => redirectIfNotLoggedIn(next, () => {
        if (Auth.methods.getUser().provider) next('/')
        else next()
      })
    }
  ]
}

function redirectIfNotLoggedIn (next, callbackFn) {
  if (Auth.methods.getAccessToken()) {
    return Auth.methods.verifyAccessToken(Auth.methods.getAccessToken(), callbackFn)
  }

  next('/login')
}
