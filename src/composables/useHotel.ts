import { Hotel } from '@/types/hotel'
import data from '@/assets/ntconsultmockdata'
import { useHotelStore } from '@/stores/hotelsStore'

export function useHotel() {
  const store = useHotelStore()
  const hotels = store.hotels

  function loadRecommendedHotels() {
    store.clearHotels()
    const sortedHotels: Hotel[] = data.sort((a, b) => b.rating.note - a.rating.note)
    const recommendedHotels: Hotel[] = sortedHotels.slice(0, 10)

    setTimeout(function () {
      hotels.push(...recommendedHotels)
    }, 3000)
  }

  function loadLocationsOfHotelsWithLimit(city: string, limit = 10): Promise<string[]> {
    const citiesSet = new Set<string>()
    const loweredCity = city.toLowerCase()

    return new Promise((resolve) => {
      setTimeout(() => {
        data.forEach(hotel => {
          const hotelCity = hotel.city.toLowerCase()
          if (hotelCity.includes(loweredCity) && !citiesSet.has(hotelCity)) {
            citiesSet.add(hotelCity)
          }
        })

        const result = Array.from(citiesSet).slice(0, limit)
        resolve(result)
      }, 500)
    })
  }

  function getHotelById(id: number): Hotel | undefined {
    return data.find(hotel => hotel.id === id)
  }

  function getHotelsBySearchForm(searchForm: { location: string; dates: string; guests: number, rooms: number }, limit = 10): Promise<Hotel[]> {
    const guestsMedia = searchForm.guests / searchForm.rooms

    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredHotels = data.filter(hotel => {
          const matchesLocation = hotel.city.toLowerCase() === searchForm.location.toLowerCase()
          const matchesGuests = guestsMedia <= hotel.rooms.accommodations_per_room
          const matchesRooms = searchForm.rooms <= hotel.rooms.quantity
          return matchesLocation && matchesGuests && matchesRooms
        })
        const limitedResults = filteredHotels.slice(0, limit)
        resolve(limitedResults)
      }, 1000)
    })
  }

  return {
    loadRecommendedHotels,
    loadLocationsOfHotelsWithLimit,
    getHotelById,
    getHotelsBySearchForm,
  }
}