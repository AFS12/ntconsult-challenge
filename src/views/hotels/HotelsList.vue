<template>
  <section class="hotels-list">
    <v-row>
      <v-spacer/>
      <v-col
        class="justify-center"
        cols="12"
        xl="6"
        lg="8"
        md="10"
        sm="12"
      >
        <SearchForm @search="search()"/>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row>
      <v-spacer/>
      <v-col
        class="filters"
        cols="12"
        xl="1"
        lg="2"
        md="3"
      >
        filter
      </v-col>
      <v-col
        class="justify-center align-center"
        cols="12"
        xl="5"
        lg="6"
        md="7"
        sm="12"
      >
        <v-row v-show="!loadingHotels">
          <v-col
            class="hotel-cards"
            cols="12"
            v-for="hotel in hotels"
            :key="hotel.id"
          >
            <CustomCard>
              <HotelCard :hotel="hotel"/>
            </CustomCard>
          </v-col>
        </v-row>
        <v-row v-show="loadingHotels">
          <v-col
            cols="12"
            v-for="item in 9"
            :key="item"
          >
            <v-row>
              <v-spacer/>
              <v-col>
                <HotelCardSkeleton/>
              </v-col>
              <v-spacer/>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer/>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useHotel } from '@/composables/useHotel'
import { Hotel } from '@/types/hotel'
import SearchForm from '@/components/forms/SearchForm.vue'
import HotelCard from '@/components/shared/HotelCard.vue'
import HotelCardSkeleton from '@/components/shared/HotelCardSkeleton.vue'
import CustomCard from '@/components/shared/CustomCard.vue'

export default defineComponent({
  name: 'HotelsList',
  components: {
    SearchForm,
    HotelCard,
    HotelCardSkeleton,
    CustomCard,
  },
  setup () {
    const { getSearchForm } = useSearchStore()
    const { getHotelsBySearchForm } = useHotel()

    return {
      getSearchForm,
      getHotelsBySearchForm,
    }
  },
  data() {
    return {
      hotels: [] as Hotel[],
      loadingHotels: false,
    }
  },
  mounted() {
    this.loadingHotels = true
    this.getHotelsBySearchForm(this.getSearchForm(), 10).then((hotels) => {
      this.hotels = hotels as Hotel[]
    }).finally(() => {
      this.loadingHotels = false
    })
  },

  methods: {
    search() {
      this.hotels = []
      this.loadingHotels = true
      this.getHotelsBySearchForm(this.getSearchForm(), 10).then((hotels) => {
        this.hotels = hotels as Hotel[]
      }).finally(() => {
        this.loadingHotels = false
      })
    },
  },
})
</script>