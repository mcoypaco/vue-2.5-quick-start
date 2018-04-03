<template>
  <v-form>
    <v-text-field
      :label="passwordLabel || 'Password'"
      type="password"
      :value="password"
      @input="updatePassword"
      @blur="$v.password.$touch()"
      :error-messages="passwordErrors"
      required
    ></v-text-field>
    <v-text-field
      label="Confirm Password"
      type="password"
      :value="passwordConfirmation"
      @input="updatePasswordConfirmation"
      @blur="$v.passwordConfirmation.$touch()"
      :error-messages="passwordConfirmationErrors"
      required
    ></v-text-field>
  </v-form>
</template>
<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    passwordLabel: {
      type: String
    }
  },
  computed: {
    ...mapState('passwordConfirmation', [
      'password',
      'passwordConfirmation'
    ]),
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      return errors
    },
    passwordConfirmationErrors () {
      const errors = []
      if (!this.$v.passwordConfirmation.$dirty) return errors
      this.$v.passwordConfirmation.sameAsPassword || errors.push(`Passwords not match`)
      if (!this.$v.passwordConfirmation.$invalid) this.setPasswordConfirmation(this.passwordConfirmation)
      return errors
    }
  },
  methods: {
    ...mapMutations('passwordConfirmation', [
      'setPassword',
      'setPasswordConfirmation'
    ]),
    updatePassword (password) {
      this.setPassword(password)
    },
    updatePasswordConfirmation (password) {
      this.setPasswordConfirmation(password)
    }
  },
  created () {
    this.setPassword('')
    this.setPasswordConfirmation('')
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirmation: {
      sameAsPassword: sameAs('password')
    }
  }
}
</script>
