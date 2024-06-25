import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchForm', {
  state: () => ({
    searchForm: {
      location: 'new york',
      dates: '',
      guests: 1,
      rooms: 1,
    },
  }),
  actions: {
    setSearchForm(data: { location: string; dates: string; guests: number, rooms: number }) {
      this.searchForm = data
    },
    clearSearchForm() {
      this.searchForm = {
        location: 'new york',
        dates: '',
        guests: 1,
        rooms: 1,
      }
    },
    getSearchForm() {
      return this.searchForm
    },
  },
})
