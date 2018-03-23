<template>
  <v-layout row justify-center>
    <v-dialog :value="alertDialog" lazy persistent max-width="500">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ body }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="closeAndAgree()">{{ actionLabel }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppAlertDialog',
  computed: {
    ...mapState('dialog', [
      'alertDialog',
      'title',
      'body',
      'action',
      'actionLabel'
    ])
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    closeAndAgree () {
      this.closeDialog('alertDialog')
      if (this.action) this.action()
    }
  }
}
</script>
