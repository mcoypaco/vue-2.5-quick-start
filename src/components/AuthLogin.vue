<template>
  <v-content>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm8 md6 lg4 xl3>
        <v-layout justify-center>
          <img src="/static/img/logo.png" class="mb-3" height="150"/>
        </v-layout>
        <v-form v-model="valid">
          <v-card>
            <v-card-title>
              <v-flex class="mx-3">
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <router-link to="/password/reset">Having trouble logging in?</router-link>
              </v-flex>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {

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
