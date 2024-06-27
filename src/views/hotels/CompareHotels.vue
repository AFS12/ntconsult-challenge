<template>
  <v-card>
    <v-card-title primary-title>
      <v-row>
        <v-col>
          Compare hotels
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="text-end">
          <v-icon @click="$emit('close')">
            mdi-close
          </v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <section class="compare-hotels-container">
        <CustomCard class="compare-hotel-card"
          v-for="hotel in hotels"
          :key="hotel.id"
        >
          <v-img
            :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
            height="200"
            width="360"
            alt="hotel image"
            cover
            lazy-src="/img/systemLogo.png"
          />
          <section class="compare-hotel-info">
            <h3 class="hotel-name border-bottom">
              {{ hotel.hotel_name }}
            </h3>
            <div class="hotel-rating border-bottom">
              <v-rating
                :model-value="hotel.rating.note"
                disabled
                :active-color="colors.mintGreen"
                half-increments
                density="compact"
              />
              <br>
              <small class="rating-note">
                ({{ hotel.rating.quantity_reviews }}) reviews
              </small>
            </div>
            <div class="hotel-benefits border-bottom">
              <v-chip
                class="hotel-bonus-chip"
                variant="tonal"
                label
                size="small"
                :color="colors.navyBlue"
                v-for="bonus in hotel.package_included"
                :key="bonus"
              >
                {{ bonus }}
              </v-chip>
            </div>
            <h3 class="hotel-price">
              R${{ hotel.price_per_night }} 
              <small>
                Per night
              </small>
            </h3>
            <small class="total-price">
              For {{ searchForm.guests }} guest(s)
            </small>
            <br>
            <small class="total-price">
              Into {{ searchForm.rooms }} room(s)
            </small>
            <br>
            <small class="total-price">
              Per {{ days }} days
            </small>
            <br>
            <h3 class="total-price">
              Total: R${{ totalPrice(hotel.price_per_night) }}
            </h3>
          </section>
        </CustomCard>
    </section>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Hotel } from '@/types/hotel'
import { useColors } from '@/composables/useColors'
import CustomCard from '@/components/shared/CustomCard.vue'

export default defineComponent({
  name: 'CompareHotels',
  components: {
    CustomCard,
  },
  setup () {
    const { colors } = useColors()

    return {
      colors,
    }
  },
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      default: () => [],
    },
    searchForm: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  computed: {
    days() {
      if (this.searchForm.dates == null || this.searchForm.dates.length === 0) return 1

      const startDate = new Date(this.searchForm.dates[0]).getTime()
      const endDate = new Date(this.searchForm.dates[1]).getTime()
      const diffTime = Math.abs(endDate - startDate)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
  },
  methods: {
    totalPrice(perNight: number) {
      return (perNight * this.searchForm.rooms) * this.days
    },
  },
})
</script>