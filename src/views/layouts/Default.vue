<template>
  <v-toolbar>
    <v-toolbar-title class="header">
      <div
        class="logo"
        @click="$router.push({ name: 'home' })"
      >
        <v-img 
          class="logo-img"
          width="50"
          height="50"
          src="/img/systemLogo.svg"
          alt="Check-In Point Logo" 
        />
        <h1 class="system-name">
          Check-In Point
        </h1>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
  <v-container 
    fluid
    class="main-content"
  >
    <h1>Base</h1>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  components: {
  },
}
</script>
