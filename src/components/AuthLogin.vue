<template>
  <v-content>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm8 md6 lg4 xl3>
        <v-layout justify-center>
          <img src="/static/img/logo.png" class="mb-3" height="150"/>
        </v-layout>
        <v-form ref="form" lazy-validation>
          <v-card>
            <v-card-title>
              <v-flex class="mx-3">
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                  validate-on-blur
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                  validate-on-blur
                ></v-text-field>
                <router-link to="/password/reset">Having trouble logging in?</router-link>
              </v-flex>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat type="submit" @click.prevent="submit" :loading="busy">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import axios from 'axios'

import env from '../environments'
import Auth from '../mixins/Auth'
import HttpException from '../mixins/HttpException'

export default {
  name: 'AuthLogin',
  mixins: [ Auth, HttpException ],
  data () {
    return {
      busy: false,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [ v => !!v || 'Password is required' ]
    }
  },
  methods: {
    attemptLogin () {
      this.busy = true

      return axios
        .post(`${env.api.url}/oauth/token`, {
          grant_type: 'password',
          client_id: env.api.client_id,
          client_secret: env.api.client_secret,
          username: this.email,
          password: this.password
        })
    },
    storeAccessToken (data) {
      this.setApiAccess(data)
      this.$router.push({ name: 'Home' })
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.attemptLogin()
          .then(({ data }) => this.storeAccessToken(data))
          .catch(error => {
            this.handle(error)
          })
          .finally(() => {
            this.busy = false
          })
      }
    }
  }
}
</script>

<style scoped>
  main {
    height: 100vh !important
  }
</style>
