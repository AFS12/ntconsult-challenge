<template>
  <section class="hotel-page">
    <v-row>
      <v-spacer/>
      <v-col
        v-if="!loadingHotelInfo"
        cols="12"
        xl="6"
        lg="8"
        md="10"
        sm="12"
      >
        <v-img
          lazy-src="/img/systemLogo.png"
          :src="`/img/hotels-thumbs/${hotel.hotel_image}.jpg`"
          alt="hotel image"
          color="hotel-image"
          max-height="350"
          cover
        />
        <h1 class="hotel-name">
          {{ hotel.hotel_name }}
        </h1>
        <div class="hotel-address">
          {{ hotel.country }}, {{ hotel.city }}, {{ hotel.address }}
        </div>
        <br/>
        <v-expand-transition>
          <v-rating
            class="hotel-rating"
            :model-value="hotel.rating.note"
            disabled
            :active-color="colors.mintGreen"
            half-increments
            density="compact"
            v-show="!booking"
          />
        </v-expand-transition>
        <v-expand-transition>
          <p
            class="hotel-description"
            v-show="!booking"
          >
            {{ hotel.hotel_description }}
          </p>
        </v-expand-transition>
        <v-expand-transition>
          <v-row
            class="hotel-schedule-and-bonus"
            v-show="!booking"
          >
            <v-divider vertical />
            <v-col
              cols="6"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-icon
                    class="schedule-icon"
                    :color="colors.navyBlue"
                  >
                    mdi-location-enter
                  </v-icon>
                  Check-in time 
                  <br/>
                  {{ hotel.schedule.checkin_hour }}
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-icon
                    class="schedule-icon"
                    :color="colors.navyBlue"
                  >
                    mdi-location-exit
                  </v-icon>
                  Check-out time
                  <br/>
                  {{ hotel.schedule.checkout_hour }}
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical />
            <v-col
              cols="6"
            >
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
            </v-col>
            <v-divider vertical />
          </v-row>
        </v-expand-transition>
        <v-row class="hotel-booking-btn-section">
          <v-col
            cols="12"
            class="text-center"
          >
            <v-btn
              v-show="!booking"
              class="hotel-booking-btn"
              :color="colors.navyBlue"
              elevation="0"
              width="200px"
              @click="booking = true"
            >
              Booking
              <v-icon class="icon">
                mdi-airplane
              </v-icon>
            </v-btn>
            <v-btn
              v-show="booking"
              :color="colors.navyBlue"
              elevation="0"
              variant="outlined"
              width="200px"
              @click="booking = false"
            >
              Cancel booking
            </v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <v-row
            class="booking"
            v-show="booking"
          >
            <v-col
              cols="12"
            >
              <BookingForm :hotel="hotel"/>
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-col>
      <v-col
        v-else
        cols="12"
        xl="6"
        lg="8"
        md="10"
        sm="12"
      > 
        <v-skeleton-loader
          class="mx-auto"
          elevation="0"
          height="850"
          type="image, text, paragraph, paragraph, chip, article, actions"
        />
      </v-col>
      <v-spacer/>
    </v-row>
  </section>
</template>

<script lang="ts">
import BookingForm from '@/components/forms/BookingForm.vue'
import { defineComponent } from 'vue'
import { useHotel } from '@/composables/useHotel'
import { useColors } from '@/composables/useColors'
import { Hotel } from '@/types/hotel'

export default defineComponent({
  name: 'HotelDetails',
  components: {
    BookingForm,
  },
  setup () {
    const { getHotelById } = useHotel()
    const { colors } = useColors()

    return {
      getHotelById,
      colors,
    }
  },
  data() {
    return {
      hotel: {} as Hotel,
      loadingHotelInfo: true,
      booking: false,
    }
  },
  mounted() {
    this.loadingHotelInfo = true
    this.getHotelById(Number(this.$route.params.id)).then((hotel) => {
      this.hotel = hotel as Hotel
    }).finally(() => {
      this.loadingHotelInfo = false
    })
  },
})
</script>