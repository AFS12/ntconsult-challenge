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
        <SearchForm @search="search($event)"/>
      </v-col>
      <v-spacer/>
    </v-row>
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
        <v-row class="reorder-compare-section">
          <v-select
            label="Order by"
            variant="outlined"
            :color="colors.navyBlue"
            item-title="text"
            item-value="value"
            density="compact"
            :items="orderOptions"
            v-model="orderBy"
          />
          <v-spacer/>
          <v-btn
            :disabled="compareList.length < 2"
            :color="colors.navyBlue"
            elevation="0"
            @click="compareDialog = true"
          >
            Compare
          </v-btn>
        </v-row>
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
              :dates="searchForm.dates"
              :compareListLength="compareList.length"
              @compare="addToCompare($event)"
              @click="toHotelDetails( hotel.id )"
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
    <v-row class="infinite-scroll-loader">
      <v-spacer/>
      <v-progress-circular 
        v-show="!noMoreHotels"
        indeterminate 
        :color="colors.mintGreen"
        :size="43" 
        :width="10"
      />
      <h2 v-show="noMoreHotels">
        No more hotels!
      </h2>
      <v-spacer/>
    </v-row>
  </section>
  <v-dialog
    v-model="compareDialog"
    max-width="1200px"
    transition="dialog-transition"
    :fullscreen="isMobile"
  >
    <CompareHotels
      :hotels="compareList"
      :searchForm="searchForm"
      @close="compareDialog = false"
    />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useHotel } from '@/composables/useHotel'
import { useColors } from '@/composables/useColors'
import { Hotel } from '@/types/hotel'
import SearchForm from '@/components/forms/SearchForm.vue'
import HotelCardSearchList from './HotelCardSearchList.vue'
import HotelCardSearchListSkeleton from './HotelCardSearchListSkeleton.vue'
import CompareHotels from './CompareHotels.vue'

type OrderBy = 0 | 1 | 2 | 3 | 4 | 5;

export default defineComponent({
  name: 'HotelsList',
  components: {
    SearchForm,
    HotelCardSearchListSkeleton,
    HotelCardSearchList,
    CompareHotels,
  },
  setup () {
    const { getSearchForm } = useSearchStore()
    const { getHotelsBySearchForm, orderOptions } = useHotel()
    const { colors } = useColors()

    return {
      getSearchForm,
      getHotelsBySearchForm,
      orderOptions,
      colors,
    }
  },
  data() {
    return {
      hotels: [] as Hotel[],
      loadingHotels: false,
      loadingMoreHotels: false,
      noMoreHotels: false,
      searchForm: [] as any,
      compareList: [] as Hotel[],
      orderBy: 0 as OrderBy,
      compareDialog: false,
    }
  },
  mounted() {
    this.loadingHotels = true
    this.searchForm = this.getSearchForm()
    this.search(this.searchForm)
    window.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    orderBy() {
      this.search(this.searchForm)
    },
  },
  computed: {
    isMobile() {
      const userAgent = navigator.userAgent || navigator.vendor
      const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth <= 800

      return isMobileUserAgent || isSmallScreen
    },
  },
  methods: {
    toHotelDetails(hotelId: number) {
      this.$router.push({ name: 'hotelDetails', params: { id: hotelId }})
    },
    search(search: any) {
      this.$router.push({ name: 'hotelsList', query: {
        ...search,
      }})
      this.hotels = []
      this.loadingHotels = true
      this.noMoreHotels = false
      this.compareList = []
      this.getHotelsBySearchForm(this.getSearchForm(), 10, this.orderBy).then((hotels) => {
        this.hotels = hotels as Hotel[]
        
        if (hotels.length == 0) {
          this.noMoreHotels = true
        }
      }).finally(() => {
        this.loadingHotels = false
      })
    },
    loadMoreHotels() {
      if (this.noMoreHotels) {
        return
      }
      this.loadingMoreHotels = true
      this.getHotelsBySearchForm(this.getSearchForm(), 10, this.orderBy, this.hotels).then((hotels) => {
        this.hotels = this.hotels.concat(hotels as Hotel[])
        
        if (hotels.length == 0) {
          this.noMoreHotels = true
        }
      }).finally(() => {
        this.loadingMoreHotels = false
      })
    },
    addToCompare({ compare, hotel }: any) {
      if (compare) {
        this.compareList.push(hotel)
        return
      }

      if (!compare) {
        this.compareList = this.compareList.filter((item: any) => item.id !== hotel.id)
        return
      }
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && !this.loadingMoreHotels) {
        this.loadMoreHotels()
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
})
</script>