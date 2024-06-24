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
    const cities = data.map(hotel => hotel.city)
    const loweredCity = city.toLocaleLowerCase()

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = cities.filter(cityList => cityList.toLocaleLowerCase().includes(loweredCity))
          .slice(0, limit)
        resolve(result)
      }, 500)
    })
  }


  return { loadRecommendedHotels, loadLocationsOfHotelsWithLimit }
}