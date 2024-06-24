import { defineStore } from 'pinia'
import { Hotel } from '@/types/hotel'

export const useHotelStore = defineStore('hotels', {
  state: () => ({
    hotels: [] as Hotel[],
  }),
  actions: {
    addHotel(hotel: Hotel) {
      this.hotels.push(hotel)
    },
    removeHotel(hotel: Hotel) {
      const index = this.hotels.indexOf(hotel)
      if (index > -1) {
        this.hotels.splice(index, 1)
      }
    },
    updateHotel(hotel: Hotel) {
      const index = this.hotels.indexOf(hotel)
      if (index > -1) {
        this.hotels[index] = hotel
      }
    },
    clearHotels() {
      this.hotels = [] as Hotel[]
    },
  },
})
