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
                    <AppPasswordConfirmation ref="passwords"/>
                    <v-btn
                      block
                      depressed
                      large
                      round
                      color="primary"
                      type="submit"
                      :loading="busy"
                      @click.prevent="changePassword"
                    >Change Password</v-btn>
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
import { mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

import env from '../environments'

import AppNotification from '../mixins/AppNotification'
import AppPasswordConfirmation from './AppPasswordConfirmation'
import Auth from '../mixins/Auth'
import HttpException from '../mixins/HttpException'

export default {
  components: { AppPasswordConfirmation },
  mixins: [ AppNotification, Auth, HttpException ],
  data () {
    return {
      busy: false,
      email: ''
    }
  },
  computed: {
    ...mapState('passwordConfirmation', [
      'password',
      'passwordConfirmation'
    ]),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid email')
      !this.$v.email.required && errors.push('Email is required')
      return errors
    }
  },
  methods: {
    changePassword () {
      this.$v.$touch()
      this.$refs.passwords.$v.$touch()

      if (!this.$v.invalid && !this.$refs.passwords.$v.$invalid) {
        this.busy = true

        axios
          .post(`${env.api.url}/api/password/reset/${this.$route.params.token}`, {
            token: this.$route.params.token,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          })
          .then(resp => {
            this.simpleNotification('Password reset successful!')
            this.attemptLogin()
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
