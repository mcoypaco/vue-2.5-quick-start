<template>
  <v-app>
    <v-content>
      <v-layout column fill-height align-center justify-center>
        <h1 class="display-4 hidden-sm-and-down red--text">Error 4<span>&#9785;</span>4</h1>
        <h1 class="hidden-md-and-up display-3 red--text">Error 4<span>&#9785;</span>4</h1>
        <div class="body-1 my-4">
          <p>Sorry, but the page you were trying to view does not exist.</p>
          <p>It looks like this was the result of either:</p>
          <ul>
            <li>a mistyped address</li>
            <li>an out-of-date link</li>
          </ul>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn href="/" color="primary" flat>Back to home</v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
