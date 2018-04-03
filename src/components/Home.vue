<template>
  <v-app>
    <v-content>
      <v-toolbar app clipped-left>
        <img src="../assets/logo.png" alt="site Logo" class="hidden-sm-and-down mx-3 site-logo"/>
        <v-toolbar-title>
          <span class="title">{{ route }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <v-avatar slot="activator">
            <img :src="user.avatar || '/static/img/logo.png'" alt="avatar">
          </v-avatar>
          <v-list>
            <v-subheader>{{ user.name }}</v-subheader>
            <v-divider></v-divider>
            <v-list-tile v-if="!user.provider" @click="changePassword">
              <v-list-tile-title>
                Change Password
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout">
              <v-list-tile-title>
                Logout
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Auth from '../mixins/Auth'
import HttpException from '../mixins/HttpException'

export default {
  mixins: [
    Auth,
    HttpException
  ],
  data () {
    return {
      busy: false,
      user: this.getUser()
    }
  },
  computed: {
    ...mapState('core', ['route'])
  },
  methods: {
    ...mapMutations('core', ['setRoute']),
    changePassword () {
      this.$router.push({ name: 'Change Password' })
    }
  },
  created () {
    this.setRoute('Home')
  }
}
</script>
<style scoped>
  .site-logo {
    max-height: 50px;
  }
</style>
