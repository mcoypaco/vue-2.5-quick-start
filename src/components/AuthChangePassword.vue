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
                  <h3 class="title my-3 primary--text">Change Password</h3>
                  <v-form>
                    <v-text-field
                      label="Current Password"
                      v-model="currentPassword"
                      type="password"
                      :error-messages="currentPasswordErrors"
                      :loading="checkingPassword"
                      @blur="$v.currentPassword.$touch()"
                      required
                    ></v-text-field>
                    <AppPasswordConfirmation :passwordLabel="passwordLabel"/>
                    <v-btn
                      block
                      depressed
                      large
                      round
                      color="primary"
                      type="submit"
                      @click.prevent="save"
                      :loading="busy"
                      >Save Changes</v-btn>
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
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

import Auth from '../mixins/Auth'
import AppNotification from '../mixins/AppNotification'
import AppPasswordConfirmation from '@/components/AppPasswordConfirmation'
import HttpException from '../mixins/HttpException'

export default {
  components: {
    AppPasswordConfirmation
  },
  mixins: [
    AppNotification,
    Auth,
    HttpException
  ],
  data () {
    return {
      busy: false,
      checkingPassword: false,
      currentPassword: '',
      passwordLabel: 'New Password'
    }
  },
  computed: {
    ...mapState('passwordConfirmation', [
      'password',
      'passwordConfirmation'
    ]),
    currentPasswordErrors () {
      const errors = []

      if (!this.$v.currentPassword.$dirty) return errors

      !this.$v.currentPassword.required && errors.push('Current password is required')
      !this.$v.currentPassword.isValid && errors.push('Invalid password')

      return errors
    }
  },
  methods: {
    ...mapActions('api/user', [
      'changePassword',
      'checkPassword'
    ]),
    save () {
      if (!this.$v.$invalid) {
        this.busy = true

        const payload = {
          current_password: this.currentPassword,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        }

        this.changePassword(payload)
          .then(resp => {
            this.simpleNotification('Password changed')
          })
          .catch(({ response }) => this.handle(response))
          .finally(() => {
            this.busy = false
          })
      }
    }
  },
  validations: {
    currentPassword: {
      required,
      isValid (currentPassword) {
        if (currentPassword === '' || !this.$v.currentPassword.required) return true

        this.checkingPassword = true

        return new Promise((resolve, reject) => {
          this
            .checkPassword({
              password: currentPassword
            })
            .then(({ data }) => resolve(data))
            .catch(({ response }) => this.handle(response))
            .finally(() => {
              this.checkingPassword = false
            })
        })
      }
    }
  }
}
</script>
