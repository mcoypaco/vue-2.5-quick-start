import Auth from '../mixins/Auth'

const Home = () => import('../components/Home')

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
