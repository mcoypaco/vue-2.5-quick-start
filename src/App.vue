<template>
  <v-app>
    <router-view/>
    <AppAlertDialog/>
    <AppConfirmationDialog/>
  </v-app>
</template>

<script>
import AppAlertDialog from '@/components/AppAlertDialog'
import AppConfirmationDialog from '@/components/AppConfirmationDialog'

export default {
  name: 'App',
  components: { AppAlertDialog, AppConfirmationDialog }
}
</script>

<style>
  a {
    text-decoration: none
  }
</style>
