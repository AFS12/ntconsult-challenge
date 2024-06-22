<template>
  <v-toolbar class="header">
    <v-toolbar-title>
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

    <v-btn>
      <v-icon class="button-icon">mdi-briefcase-check-outline</v-icon>
      <span class="button-text">
        My reservations
      </span>
    </v-btn>
  </v-toolbar>
  <v-container 
    fluid
    class="main-content"
  >
    <h1>Base</h1>
    <router-view/>
  </v-container>

  <v-footer absolute>
    <h1>Footer</h1>
  </v-footer>
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
