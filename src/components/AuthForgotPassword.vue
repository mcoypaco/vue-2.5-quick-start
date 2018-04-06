<template>
  <v-app>
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
                  <h3 class="title my-3 primary--text">Reset Password</h3>
                  <v-form>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      :error-messages="emailErrors"
                      @blur="$v.email.$touch()"
                      required
                    ></v-text-field>
                    <v-btn
                      block
                      depressed
                      large
                      round
                      color="primary"
                      type="submit"
                      @click.prevent="resetPassword"
                      :loading="busy"
                      >Send Reset Password Link</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'
import { email, required } from 'vuelidate/lib/validators'

import env from '../environments'
import HttpException from '../mixins/HttpException'
import AppNotification from '../mixins/AppNotification'

export default {
  mixins: [ HttpException, AppNotification ],
  data () {
    return {
      email: '',
      busy: false
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required')
      !this.$v.email.email && errors.push('Must be valid email')
      return errors
    }
  },
  methods: {
    resetPassword () {
      this.$v.email.$touch()

      if (!this.$v.email.$invalid) {
        this.busy = true

        axios.post(`${env.api.url}/api/password/reset`, { email: this.email })
          .then(resp => {
            this.simpleNotification('We have sent your password reset link!')
            this.$router.push({ name: 'Login' })
          })
          .catch(({ response }) => this.handle(response))
          .finally(() => {
            this.busy = false
          })
      }
    }
  },
  validations: {
    email: { required, email }
  }
}
</script>
