<template>
  <v-app>
    <router-view/>
    <app-alert-dialog></app-alert-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  a {
    text-decoration: none
  }
</style>
