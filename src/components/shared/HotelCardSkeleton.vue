<template>
    <div class="hotel-details-skeleton">
      <v-skeleton-loader
        :color="colors.lavender80"
        width="280"
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