import { defineStore } from 'pinia'

export const useBookingStore = defineStore('useBookingStore', {
  state: () => ({
    searchForm: {
      location: 'new york',
      dates: [] as string[],
      guests: 1,
      rooms: 1,
    },
  }),
  actions: {
    setSearchForm(data: { location: string; dates: string[]; guests: number, rooms: number }) {
      this.searchForm = data
    },
    clearSearchForm() {
      this.searchForm = {
        location: 'new york',
        dates: [] as string[],
        guests: 1,
        rooms: 1,
      }
    },
    getSearchForm() {
      return this.searchForm
    },
  },
})
