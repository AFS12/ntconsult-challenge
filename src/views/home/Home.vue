<template>
  <section class="home">
    <v-row>
      <v-spacer/>
      <v-col
        class="justify-center"
        cols="12"
        xl="8"
        lg="10"
        md="12"
        sm="12"
      >
        <SearchForm @search="toHotelsList()"/>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row>
      <v-spacer/>
      <v-col
        class="justify-center"
        cols="12"
        xl="8"
        lg="10"
        md="12"
        sm="12"
      >
      <CustomCard class="offer-card">
        <v-row class="align-center">
          <v-col
            cols="12"
            lg="3"
            md="3"
            sm="12"
          >
            <div class="offer-card-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </v-col>
          <v-col
            cols="12"
            lg="9"
            md="9"
            sm="12"
          >
            <section class="offers-container">
              <CustomCard class="offer">
                <v-icon
                color="white"
                size="65"
                >
                mdi-airplane
                </v-icon>
                <div class="offer-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </CustomCard>
              <CustomCard class="offer">
                <v-icon
                color="white"
                size="65"
                >
                mdi-room-service
              </v-icon>
              <div class="offer-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              </CustomCard>
                <CustomCard class="offer">
                  <v-icon
                  color="white"
                    size="65"
                  >
                  mdi-fireplace
                </v-icon>
                <div class="offer-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </CustomCard>
            </section>
          </v-col>
        </v-row>
      </CustomCard>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row>
      <v-spacer/>
      <v-col
        class="justify-center align-center"
        cols="12"
        xl="8"
        lg="10"
        md="12"
        sm="12"
      >
        <CustomCard
          class="hotel-carrosel-section"
          :customStyle="hotelCardCarroselStyle"
        >
          <section>
            <span class="title">
              Our selection of recommended hotels
            </span>
            <br>
            <HotelCarousel :hotels="hotels"/>
          </section>
        </CustomCard>
      </v-col>
      <v-spacer/>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import HotelCarousel from '@/components/shared/HotelCarousel.vue'
import CustomCard from '@/components/shared/CustomCard.vue'
import { useHotel } from '@/composables/useHotel'
import { useHotelStore } from '@/stores/hotelsStore'

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchForm,
    CustomCard,
    HotelCarousel,
  },
  setup() {
    const { loadRecommendedHotels } = useHotel()
    const store = useHotelStore()
    const hotels = store.hotels

    return {
      loadRecommendedHotels,
      hotels,
    }
  },
  data() {
    return {
      hotelCardCarroselStyle: {
        backgroundImage: ' linear-gradient(to top, #B0B0B066, #2E473B66), url(/img/home-hotel-carousel.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      
    }
  },
  mounted() {
    this.loadRecommendedHotels()
  },
  methods: {
    toHotelsList() {
      this.$router.push({ name: 'hotelsList' })
    },
  },
})
</script>