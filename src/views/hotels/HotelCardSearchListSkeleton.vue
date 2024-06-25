<template>
  <div>
    <v-skeleton-loader
      :color="colors.lavender80"
      width="100%"
      height="300"
      type="image, article"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColors } from '@/composables/useColors'

export default defineComponent({
  name: 'HotelCardSkeleton',
  setup() {
    const { colors } = useColors()
    return { colors }
  },
})
</script>