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
    <div
      class="hotel-details"
      v-for="hotel in hotels"
      :key="hotel.id"
    >
      <v-img
        :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
        height="150"
        width="260"
        alt="hotel image"
        cover
        lazy-src="/img/systemLogo.png"
        class="hotel-image"
      />
      <small class="hotel-city">
        {{ hotel.city }}
      </small>
      <h3 class="hotel-name">
        {{ hotel.hotel_name }}
      </h3>
      <div class="hotel-rating">
        <v-rating
          v-model="hotel.rating.note"
          disabled
          :active-color="colors.mintGreen"
          half-increments
          density="compact"
          size="small"
        />
        <small class="rating-note">
          ({{ hotel.rating.quantity_reviews }}) reviews
        </small>
      </div>
      <h3>
        R${{ hotel.price_per_night }}
        <small>
          per night
        </small>
      </h3>
    </div>
  </section>
  <section
    class="hotel-carrosel"
    v-show="hotels.length === 0"
  >
    <div
      v-for="item in 10"
      class="hotel-details-skeleton"
      :key="item"
    >
      <v-skeleton-loader
        :color="colors.lavender80"
        width="260"
        height="260"
        type="image, article"
      />
    </div>
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