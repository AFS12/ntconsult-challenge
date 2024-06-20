import { defineStore } from 'pinia'

export interface Hotel {
  hotel_name: string
  address: string
  city: string
  state: string | null
  country: string
  rating: number
  price_per_night: number
  availability: boolean
  package_included: string[]
}

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
      this.hotels = []
    },
  },
})


