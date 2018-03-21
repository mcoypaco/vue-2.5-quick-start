<template>
  <v-app>
    <v-container>
      <p>Hello World!</p>
      <v-btn @click="logout">Logout</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import Auth from '../mixins/Auth'

export default {
  mixins: [ Auth ]
}
</script>
