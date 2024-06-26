<template>
  <CustomCard class="hotel-card-search-list">
    <v-row>
      <v-col
        class="hotel-image-container-mobile"
        cols="12"
      >
        <v-img
          :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
          alt="hotel image"
          min-height="250"
          cover
          lazy-src="/img/systemLogo.png"
          class="hotel-image"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="hotel-image-container"
        sm="4"
        md="4"
        lg="4"
        xl="4"
      >
        <v-img
          :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
          alt="hotel image"
          min-height="250"
          cover
          lazy-src="/img/systemLogo.png"
          class="hotel-image"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="8"
        class="hotel-info"
      >
        <h3 class="hotel-name">
          {{ hotel.hotel_name }}
        </h3>
        <small>
          {{ hotel.country }}, {{ hotel.city }}
        </small>
        <v-checkbox
          v-model="compare"
          label="Compare" 
          class="compare-checkbox"
          :color="colors.navyBlue"
        />
        <v-row>
          <v-col
            cols="6"
            class="text-left"
          >
            <section class="left-content">
              <v-chip
                class="hotel-bonus-chip"
                :color="colors.navyBlue"
                variant="tonal"
                label
                v-for="bonus in hotel.package_included"
                :key="bonus"
              >
                {{ bonus }}
              </v-chip>
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
            </section>
          </v-col>
          <v-col cols="6"
            class="text-right"
          >
            <section class="right-content">
              <span class="hotel-price">
                R${{ hotel.price_per_night }}
              </span>
              <br>
              <small class="total-price">
                For {{ guests }} guest(s)
              </small>
              <br>
              <small class="total-price">
                Into {{ rooms }} room(s)
              </small>
              <br>
              <small class="total-price">
                Total: R${{ hotel.price_per_night * rooms }}
              </small>
            </section>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CustomCard from '@/components/shared/CustomCard.vue'
import { useColors } from '@/composables/useColors'

export default defineComponent({
  name: 'HotelCardSearchList',
  components: {
    CustomCard,
  },
  props: {
    hotel: {
      type: Object as PropType<{
        id: number
        hotel_name: string
        hotel_image: string
        hotel_description: string
        address: string
        city: string
        state: string | null
        country: string
        rating: {
          note: number,
          quantity_reviews: number
        }
        price_per_night: number
        availability: boolean
        package_included: string[]
        schedule: {
          checkin_hour: string,
          checkout_hour: string
        }
        rooms: {
          quantity: number,
          accommodations_per_room: number
        }
      }>,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
    },
    rooms: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      compare: false,
    }
  },
  setup () {
    const { colors } = useColors()
    
    return {
      colors,
    }
  },
  watch: {
    compare() {
      this.compareHotels(this.hotel)
    },
  },
  methods: {
    compareHotels(hotel: any) {
      this.$emit('compare', {
        compare: this.compare,
        hotel: hotel,
      })
    },
  },
})
</script>