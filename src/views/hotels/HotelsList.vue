<template>
  <div>
    <h1>
      List of Hotels
    </h1>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearchStore } from '@/stores/searchStore'

export default defineComponent({
  name: 'HotelsList',
  setup () {
    const { getSearchForm } = useSearchStore()
    

    return {
      getSearchForm,
    }
  },
})
</script>