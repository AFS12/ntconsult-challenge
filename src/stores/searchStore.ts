import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchForm', {
  state: () => ({
    searchForm: {
      location: '',
      dates: '',
      guests: 1,
    },
  }),
  actions: {
    setSearchForm(data: { location: string; dates: string; guests: number }) {
      this.searchForm = data
    },
    clearSearchForm() {
      this.searchForm = {
        location: '',
        dates: '',
        guests: 1,
      }
    },
    getSearchForm() {
      return this.searchForm
    },
  },
})
