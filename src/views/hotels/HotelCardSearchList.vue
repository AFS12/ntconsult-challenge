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
          :disabled="disableCompare"
          @click.stop
        />
        <span :style="disableCompare ? compareStyle : 'display: none'">
          Only compare up to 5 hotels
        </span>
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
              <small>
                Per {{ days }} days
              </small>
              <br>
              <small class="total-price">
                Total: R${{ totalPrice }}
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
    dates: {
      type: Array as PropType<string[]>,
      default: [] as string[],
    },
    compareListLength: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      compare: false,
      compareLimit: false,
      compareStyle: {
        display: 'block',
        position: 'absolute',
        top: '55px',
        right: '20px',
        color: '#fff',
        backgroundColor: '#4682B4B3',
        padding: '5px',
        fontSize: '12px',
        borderRadius: '5px',
      },
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
  computed: {
    days() {
      if (this.dates == null || this.dates.length === 0) return 1

      const startDate = new Date(this.dates[0]).getTime()
      const endDate = new Date(this.dates[1]).getTime()
      const diffTime = Math.abs(endDate - startDate)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
    totalPrice() {
      return (this.hotel.price_per_night * this.rooms) * this.days
    },
    disableCompare() {
      return this.compareListLength >= 5 && !this.compare
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