import Home from '@/components/Home'

export default {
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        // Todo: check user access in store
        next('/login')
      }
    }
  ]
}
