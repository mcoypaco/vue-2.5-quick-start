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
                <h3 class="title my-3 primary--text">Sign Up</h3>
                  <v-form ref="form">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :error-messages="nameErrors"
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                      required
                    ></v-text-field>
                    <!-- Todo: Check email for duplicate -->
                    <v-text-field
                      label="Email"
                      v-model="email"
                      :loading="checkingEmail"
                      :error-messages="emailErrors"
                      @input="checkEmail"
                      @blur="$v.email.$touch()"
                      required
                    ></v-text-field>
                    <AppPasswordConfirmation/>
                    <v-btn
                      block
                      depressed
                      large
                      round
                      color="primary"
                      type="submit"
                      @click.prevent="register"
                    >Register</v-btn>
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
import _ from 'lodash'
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

import AppPasswordConfirmation from '@/components/AppPasswordConfirmation'

export default {
  components: { AppPasswordConfirmation },
  data () {
    return {
      name: '',
      email: '',
      checkingEmail: false
    }
  },
  computed: {
    ...mapState('passwordConfirmation', [
      'password',
      'passwordConfirmation'
    ]),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid email')
      !this.$v.email.required && errors.push('Email is required')
      return errors
    }
  },
  methods: {
    checkEmail: _.debounce((email) => {
      // if(!this.$v.email.$invalid) // Todo: check duplicate at storage
    }, 500),
    register () {
      if (!this.$v.$invalid && this.password === this.passwordConfirmation) {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        }

        console.log(payload)
      }
    }
  },
  validations: {
    name: { required },
    email: {
      required,
      email
    }
  }
}
</script>
