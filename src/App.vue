<template>
  <v-app>
    <router-view/>
    <AppAlertDialog/>
    <AppConfirmationDialog/>
    <AppSnackbar/>
  </v-app>
</template>

<script>
import AppAlertDialog from '@/components/AppAlertDialog'
import AppConfirmationDialog from '@/components/AppConfirmationDialog'
import AppSnackbar from '@/components/AppSnackbar'

export default {
  name: 'App',
  components: { AppAlertDialog, AppConfirmationDialog, AppSnackbar }
}
</script>

<style>
  a {
    text-decoration: none
  }
</style>
