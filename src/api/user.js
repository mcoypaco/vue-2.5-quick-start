import Rest from './rest-api'

export default {
  namespaced: true,
  strict: true,
  state: {
    url: 'user'
  },
  actions: {
    ...Rest
  }
}
