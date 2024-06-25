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
        class="justify-center align-center"
        cols="12"
        xl="6"
        lg="8"
        md="10"
        sm="12"
      >
        <v-row v-show="!loadingHotels">
          <v-col
            class="hotel-cards"
            cols="12"
            v-for="hotel in hotels"
            :key="hotel.id"
          >
            <HotelCardSearchList 
              :hotel="hotel" 
              :guests="searchForm.guests"
              :rooms="searchForm.rooms"
            />
          </v-col>
        </v-row>
        <v-row v-show="loadingHotels">
          <v-col
            cols="12"
            v-for="item in 9"
            :key="item"
          >
            <v-row>
              <v-col>
                <HotelCardSearchListSkeleton/>
              </v-col>
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
import HotelCardSearchList from './HotelCardSearchList.vue'
import HotelCardSearchListSkeleton from './HotelCardSearchListSkeleton.vue'

export default defineComponent({
  name: 'HotelsList',
  components: {
    SearchForm,
    HotelCardSearchListSkeleton,
    HotelCardSearchList,
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
      searchForm: [] as any,
    }
  },
  mounted() {
    this.loadingHotels = true
    this.searchForm = this.getSearchForm()
    this.getHotelsBySearchForm(this.searchForm, 10).then((hotels) => {
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