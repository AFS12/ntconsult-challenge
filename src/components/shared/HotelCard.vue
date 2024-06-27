<template>
  <div class="hotel-details">
    <v-img
      :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
      height="200"
      width="360"
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
        :model-value="hotel.rating.note"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useColors } from '@/composables/useColors'

export default defineComponent({
  name: 'HotelCard',
  props: {
    hotel: {
      type: Object as PropType<{
        hotel_name: string,
        city: string,
        hotel_image: string,
        rating: {
          note: number,
          quantity_reviews: number,
        },
        price_per_night: number,
      }>,
      required: true,
    },
  },
  setup () {
    const { colors } = useColors()
    

    return {
      colors,
    }
  },
})
</script>