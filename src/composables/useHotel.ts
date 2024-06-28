import { Hotel } from '@/types/hotel'
import data from '@/assets/ntconsultmockdata'
import { useHotelStore } from '@/stores/hotelsStore'

/**
 * Esse composable foi criado para simular uma API,
 * trazendo os dados a partir de um arquivo de mock (ntconsultmockdata.ts),
 * permitindo a simulação de um fluxo de carregamento com delay no retorno.
 */
export function useHotel() {
  const store = useHotelStore()
  const hotels = store.hotels
  type OrderBy = 0 | 1 | 2 | 3 | 4 | 5;
  const orderOptions: { text: string, value: OrderBy }[] = [
    {
      text: 'Price: low to high',
      value: 0,
    },
    {
      text: 'Price: high to low',
      value: 1,
    },
    {
      text: 'Stars: low to high',
      value: 2,
    },
    {
      text: 'Stars: high to low',
      value: 3,
    },
    {
      text: 'Included Bonus: more to less',
      value: 4,
    },
    {
      text: 'Included Bonus: less to more',
      value: 5,
    },
  ]

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

  function getHotelById(id: number): Promise<Hotel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hotel = data.find(hotel => hotel.id === id) as Hotel
        resolve(hotel)
      }, 2000)
    })
  }

  function getHotelsBySearchForm(
    searchForm: { location: string; dates: string[]; guests: number; rooms: number },
    limit = 10,
    orderBy: OrderBy = 0,
    searchedHotels: Hotel[] = []
  ): Promise<Hotel[]> {
    const guestsMedia = searchForm.guests / searchForm.rooms

    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredHotels = data.filter(hotel => {
          const matchesLocation = hotel.city.toLowerCase() === searchForm.location.toLowerCase()
          const matchesGuests = guestsMedia <= hotel.rooms.accommodations_per_room
          const matchesRooms = searchForm.rooms <= hotel.rooms.quantity
          let doesNotMatchesSearchedHotels = false
          if (searchedHotels.length > 0) {
            doesNotMatchesSearchedHotels = searchedHotels.some(searchedHotel => searchedHotel.id === hotel.id)
          }

          return matchesLocation && matchesGuests && matchesRooms && !doesNotMatchesSearchedHotels
        })

        const sortedHotels = filteredHotels.sort((a, b) => {
          switch (orderBy) {
            case 0:
              return a.price_per_night - b.price_per_night
            case 1:
              return b.price_per_night - a.price_per_night
            case 2:
              return a.rating.note - b.rating.note
            case 3:
              return b.rating.note - a.rating.note
            case 4:
              return b.package_included.length - a.package_included.length
            case 5:
              return a.package_included.length - b.package_included.length
            default:
              return 0
          }
        })

        const limitedResults = sortedHotels.slice(0, limit)
        resolve(limitedResults)
      }, 1000)
    })
  }

  return {
    loadRecommendedHotels,
    loadLocationsOfHotelsWithLimit,
    getHotelById,
    getHotelsBySearchForm,
    orderOptions,
  }
}