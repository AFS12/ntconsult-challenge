<template>
  <v-btn
    :color="colors.lavender80"
    v-show="hotels.length > 0"
    icon
    size="x-small"
    class="hotel-carrosel-button-left"
    @click="scrollCarousel('left')"
  >
    <v-icon size="x-large">mdi-chevron-left</v-icon>
  </v-btn>
  <section class="hotel-carrosel">
    <HotelCard 
      v-for="hotel in hotels"
      :key="hotel.id"
      :hotel="hotel"
      v-show="hotels.length > 0"
    />
    <HotelCardSkeleton
      v-show="hotels.length === 0"
      v-for="item in 10"
      :key="item"
    />
  </section>
  <v-btn
    :color="colors.lavender80"
    v-show="hotels.length > 0"
    icon
    size="x-small"
    class="hotel-carrosel-button-right"
    @click="scrollCarousel('right')"
  >
    <v-icon size="x-large">mdi-chevron-right</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Hotel } from '@/types/hotel'
import { useColors } from '@/composables/useColors'
import HotelCard from '@/components/shared/HotelCard.vue'
import HotelCardSkeleton from '@/components/shared/HotelCardSkeleton.vue'

export default {
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      default: () => [],
    },
  },
  setup () {
    const { colors } = useColors()

    return {
      colors,
    }
  },
  components: {
    HotelCard,
    HotelCardSkeleton,
  },
  methods: {
    scrollCarousel (direction: string) {
      const carousel = document.querySelector('.hotel-carrosel') as HTMLElement
      const scrollQuantity = 280

      if (direction === 'left') {
        carousel.scrollBy({
          top: 0,
          left: -scrollQuantity,
          behavior: 'smooth',
        })
      } 

      if (direction === 'right') {
        carousel.scrollBy({
          top: 0,
          left: scrollQuantity,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>