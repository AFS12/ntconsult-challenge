import { defineStore } from 'pinia'
import { Reservation } from '@/types/reservation'

export const useBookingStore = defineStore('useBookingStore', {
  state: () => ({
    reservations: [] as Reservation[],
    idCount: 0,
  }),
  actions: {
    async addReservation(reservation: object) {
      this.idCount += 1
      const reservationWithId = {
        ...reservation,
        id: this.idCount.toString(),
        status: 'pending',
      }
      setTimeout(() => {
        this.reservations.push(reservationWithId as Reservation)
      }, 4000)
      this.timedStatusChange(reservationWithId.id)
    },
    timedStatusChange(id: string) {
      setTimeout(() => {
        const reservation = this.reservations.find(reservation => reservation.id === id)
        if (reservation) {
          reservation.status = 'confirmed'
        }
      }, 10000)
    },
    getReservations() {
      return this.reservations
    },
  },
})