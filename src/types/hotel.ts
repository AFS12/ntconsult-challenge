export interface Hotel {
  id: number
  hotel_name: string
  hotel_image: string
  hotel_description: string
  address: string
  city: string
  state: string | null
  country: string
  rating: {
    note: number,
    quantity_reviews: number
  }
  price_per_night: number
  availability: boolean
  package_included: string[]
  schedule: {
    checkin_hour: string,
    checkout_hour: string
  }
  rooms: {
    quantity: number,
    accommodations_per_room: number
  }
}