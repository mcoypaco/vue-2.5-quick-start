<template>
  <v-layout row justify-center>
    <v-dialog :value="confirmationDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ body }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="closeAndDisagree()">{{ cancelLabel }}</v-btn>
          <v-btn color="primary" flat @click.native="closeAndAgree()">{{ actionLabel }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppConfirmationDialog',
  computed: {
    ...mapState('dialog', [
      'confirmationDialog',
      'title',
      'body',
      'actionLabel',
      'cancelLabel'
    ])
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    closeAndAgree () {
      this.closeDialog('confirmationDialog')
      if (this.action) this.action()
    },
    closeAndDisagree () {
      this.closeDialog('confirmationDialog')
      if (this.cancel) this.cancel()
    }
  }
}
</script>
