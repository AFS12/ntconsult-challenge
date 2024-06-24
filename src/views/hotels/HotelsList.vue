<template>
  <section class="hotels-list">
    <v-row>
      <v-spacer/>
      <v-col
        class="justify-center"
        cols="12"
        xl="8"
        lg="10"
        md="12"
        sm="12"
      >
        <SearchForm/>
      </v-col>
      <v-spacer/>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchForm from '@/components/forms/SearchForm.vue'

export default defineComponent({
  name: 'HotelsList',
  setup () {

    return {
    }
  },
  data() {
    return {
      
    }
  },
  components: {
    SearchForm,
  },
})
</script>