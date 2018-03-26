<template>
  <v-content>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm5 md4 lg3 xl2>
        <v-layout justify-center>
          <img src="/static/img/logo.png" class="mb-3" height="150"/>
        </v-layout>
        <v-card>
          <v-card-title>
            <v-layout column>
              <v-flex class="mx-3 mb-3">
                <v-form ref="form">
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
                  <div class="mb-4">
                    <router-link to="/password/reset">Having trouble logging in?</router-link>
                  </div>
                  <v-btn
                    block
                    large
                    depressed
                    class="mt-4"
                    color="primary"
                    round
                    type="submit"
                    @click.prevent="submit"
                    :loading="busy">
                    <v-icon left>mdi-email</v-icon>
                    Sign In
                  </v-btn>
                </v-form>
              </v-flex>
              <h3 class="subheading text-xs-center text-sm-center text-md-center text-lg-center text-xl-center">OR</h3>
              <v-flex class="mt-2 px-3">
                <v-btn
                  block
                  dark
                  large
                  depressed
                  round
                  color="red"
                  class="my-4"
                  :href="oAuth.google">
                  <v-icon left>mdi-google-plus</v-icon>
                  Sign in with Google
                </v-btn>
                <v-btn
                  block
                  dark
                  large
                  depressed
                  round
                  class="my-4"
                  :href="oAuth.github">
                  <v-icon left>mdi-github-circle</v-icon>
                  Sign in with Github
                </v-btn>
              </v-flex>
              <v-flex class="px-3">
                <p>
                  Don't have an account?
                  <router-link to="/register">Create an account</router-link>
                </p>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
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
      oAuth: {
        google: `${env.api.url}/login/google`,
        github: `${env.api.url}/login/github`
      },
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
    storeTokenAndRedirect (token) {
      this.setAccessToken(token)
      this.$router.push({ name: 'Home' })
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.attemptLogin()
          .then(({ data }) => this.storeTokenAndRedirect(data.access_token))
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
