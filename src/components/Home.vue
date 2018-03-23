<template>
  <v-app>
    <v-container>
      <p>Hello {{ user.name }}!</p>
      <v-btn @click="signOut" :loading="busy">Logout</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import Auth from '../mixins/Auth'

import HttpException from '../mixins/HttpException'

export default {
  mixins: [ Auth, HttpException ],
  data () {
    return {
      busy: false,
      user: this.getUser()
    }
  },
  methods: {
    signOut () {
      this.busy = true

      this.logout()
        .then(resp => {
          localStorage.removeItem('accessToken')
          this.$router.push('/login')
        })
        .catch(({ response }) => {
          this.handle(response)
        })
        .finally(() => {
          this.busy = false
        })
    }
  }
}
</script>
