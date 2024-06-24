<template>
    <div class="hotel-details-skeleton">
      <v-skeleton-loader
        :color="colors.lavender80"
        width="260"
        height="260"
        type="image, article"
      />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColors } from '@/composables/useColors'

export default defineComponent({
  name: 'HotelCardSkeleton',
  props: {
    quantity: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const { colors } = useColors()
    return { colors }
  },
})
</script>