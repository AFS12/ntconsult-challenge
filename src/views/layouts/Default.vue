<template>
  <v-toolbar class="header">
    <v-toolbar-title>
      <div
        class="logo"
        @click="$router.push({ name: 'home' })"
      >
        <v-img 
          class="logo-img"
          width="50"
          height="50"
          src="/img/systemLogo.svg"
          alt="Check-In Point Logo" 
        />
        <h1 class="system-name">
          Check-In Point
        </h1>
      </div>
    </v-toolbar-title>

    <v-menu max-width="600">
      <template v-slot:activator="{ props }">
        <v-badge
          :content="reservationsUpdateStatusQuantity"
          color="red"
          location="top left"
          :model-value="reservationsUpdateStatusQuantity > 0"
        >
          <v-btn
           v-bind="props"
           @click="resetNotifications()"
           alt="My reservations"
          >
            <v-icon class="button-icon">mdi-briefcase-check-outline</v-icon>
            <span class="button-text">
              My reservations
            </span>
          </v-btn>
        </v-badge>
    </template>
    <v-list v-if="updatedReservations.length > 0">
      <v-list-item
        v-for="(reservation , index) in updatedReservations"
        :key="index"
        :value="index"
      >
        Reservation at 
        {{ reservation.hotel.name }} is 
        <v-chip 
          label
          :color="reservation.status === 'pending' ? 'orange' : 'success'"
        >
          {{ reservation.status }}
        </v-chip>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-title>No reservations</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  </v-toolbar>
  <v-container 
    fluid
    class="main-content"
  >
    <router-view/>
  </v-container>

  <v-footer
    absolute
    class="footer"
  >
    <small>
      © 2024 Check-in point, lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo dolor repellat ipsam,
      <br>
      incidunt ex quisquam perspiciatis sed maxime corrupti ullam expedita earum iure vel, veritatis qui repudiandae.
    </small>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { storeToRefs } from 'pinia'
import { Reservation } from '@/types/reservation'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const { getReservations } = useBookingStore()
    const reservationStore = useBookingStore()
    const { reservations } = storeToRefs(reservationStore)
    let updatedReservations = ref([] as Reservation[])
    let reservationsUpdateStatusQuantity = ref(0)

    watch(reservations, () => {
      reservationsUpdateStatusQuantity.value += 1
    }, { deep: true })

    onMounted(() => {
      updatedReservations.value = reservationStore.getReservations()
    })

    return {
      getReservations,
      updatedReservations,
      reservationsUpdateStatusQuantity,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    resetNotifications() {
      this.reservationsUpdateStatusQuantity = 0
    },
  },
})
</script>
