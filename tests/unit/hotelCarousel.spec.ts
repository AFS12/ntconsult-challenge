import { shallowMount } from '@vue/test-utils'
import HotelCarousel from '../../src/components/shared/HotelCarousel.vue'
import { Hotel } from '@/types/hotel'

describe('HotelCarousel.vue', () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      hotel_name: 'Hotel 1',
      hotel_image: 'image1',
      hotel_description: 'Description 1',
      address: 'Address 1',
      city: 'City 1',
      state: 'State 1',
      country: 'Country 1',
      rating: { note: 4.5, quantity_reviews: 20 },
      price_per_night: 100,
      availability: true,
      package_included: ['Breakfast'],
      schedule: { checkin_hour: '14:00', checkout_hour: '12:00' },
      rooms: { quantity: 10, accommodations_per_room: 2 },
    },
    {
      id: 2,
      hotel_name: 'Hotel 2',
      hotel_image: 'image2',
      hotel_description: 'Description 2',
      address: 'Address 2',
      city: 'City 2',
      state: 'State 2',
      country: 'Country 2',
      rating: { note: 4.0, quantity_reviews: 10 },
      price_per_night: 150,
      availability: true,
      package_included: ['Dinner'],
      schedule: { checkin_hour: '15:00', checkout_hour: '11:00' },
      rooms: { quantity: 20, accommodations_per_room: 3 },
    },
  ]

  it('renders hotel details when passed', () => {
    const wrapper = shallowMount(HotelCarousel, {
      props: { hotels },
    })

    const hotelNames = wrapper.findAll('.hotel-name')
    expect(hotelNames).toHaveLength(hotels.length)
    expect(hotelNames[0].text()).toBe(hotels[0].hotel_name)
    expect(hotelNames[1].text()).toBe(hotels[1].hotel_name)
  })

  it('calls scrollCarousel with correct argument when left button is clicked', () => {
    const scrollCarousel = jest.fn()
    const wrapper = shallowMount(HotelCarousel, {
      props: { hotels },
      methods: { scrollCarousel },
    })

    const leftButton = wrapper.find('.hotel-carrosel-button-left')
    leftButton.trigger('click')
    expect(scrollCarousel).toHaveBeenCalledWith('left')
  })

  it('calls scrollCarousel with correct argument when right button is clicked', () => {
    const scrollCarousel = jest.fn()
    const wrapper = shallowMount(HotelCarousel, {
      props: { hotels },
      methods: { scrollCarousel },
    })

    const rightButton = wrapper.find('.hotel-carrosel-button-right')
    rightButton.trigger('click')
    expect(scrollCarousel).toHaveBeenCalledWith('right')
  })
})
