<template>
  <v-form
    class="booking-form"
    ref="form"
    @submit.prevent="submit"
  >
    <CustomCard class="user-details">
      <h3>
        <v-icon>mdi-account-box</v-icon>
        Your details
      </h3>
      <v-divider/>
      <v-row class="user-details-form form">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.user.name"
            :rules="rules"
            variant="outlined"
            alt="First name"
            label="First name"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.user.lastName"
            :rules="rules"
            variant="outlined"
            alt="last name"
            label="Last name"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.user.email"
            :rules="rules"
            variant="outlined"
            alt="Email address"
            label="Email address"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.user.phone"
            :rules="rules"
            variant="outlined"
            alt="Cell phone number"
            label="Cell phone number"
            v-mask="'+## (##) 9####-####'"
            placeholder="+00 (00) 0000-0000"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
      </v-row>
    </CustomCard>
    <CustomCard class="accommodation-details">
      <h3>
        <v-icon>mdi-bed</v-icon>
        Accommodation details
      </h3>
      <v-divider/>
      <v-row class="accommodation-details-form form">
        <v-col
          cols="12"
          md="4"
        >
          <VueDatePicker
            class="home-form-datepicker"
            placeholder="Select Date"
            alt="Select Date"
            v-model="form.accommodation.dates"
            required
            range
            format="dd/MM/yyyy"
            :min-date="new Date()"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-number-input
            v-model="form.accommodation.rooms"
            :rules="rules"
            controlVariant="stacked"
            variant="outlined"
            density="compact"
            label="Rooms"
            alt="Rooms"
            required
            :reverse="false"
            :min="1"
            :max="10"
            :hideInput="false"
            :inset="false"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-number-input
            v-model="form.accommodation.guests"
            :rules="rules"
            controlVariant="stacked"
            variant="outlined"
            density="compact"
            label="Guests"
            alt="Guests"
            required
            :reverse="false"
            :min="form.accommodation.rooms"
            :max="10"
            :hideInput="false"
            :inset="false"
          />
        </v-col>
      </v-row>
    </CustomCard>
    <CustomCard class="payment-details">
      <h3>
        <v-icon>mdi-credit-card</v-icon>
        Payment details
      </h3>
      <v-divider/>
      <v-row class="payment-details-form form">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.payment.cardOwnerFirstName"
            :rules="rules"
            variant="outlined"
            alt="Card owner first name"
            label="Card owner first name"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.payment.cardOwnerLastName"
            :rules="rules"
            variant="outlined"
            alt="Card owner last name"
            label="Card owner last name"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="form.payment.cardName"
            :rules="rules"
            variant="outlined"
            alt="Name printed on card"
            label="Name printed on card"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="form.payment.cardNumber"
            :rules="rules"
            variant="outlined"
            alt="Card number"
            v-mask="'####-####-####-####'"
            placeholder="0000-0000-0000-0000"
            label="Card number"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <VueDatePicker
            class="home-form-datepicker"
            placeholder="Card expiration date"
            v-model="form.payment.cardExpirationDate"
            required
            month-picker
            :min-date="new Date()"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="form.payment.cardCvc"
            :rules="rules"
            variant="outlined"
            alt="Card security code"
            label="Card security code"
            v-mask="'###'"
            placeholder="000"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="form.payment.installment"
            :items="installmentOptions"
            :rules="rules"
            variant="outlined"
            alt="installment"
            label="Installment"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-spacer/>
        <v-col
          class="d-flex justify-end"
          cols="12"
          md="4"
        >
          <div class="payment-price-container">
            <h4 class="hotel-price">
              {{ form.payment.installment || '-' }}
            </h4>
            <h5 class="total-price">
              Total: R${{ totalPrice }}
            </h5>
          </div>
          <v-btn
            :color="colors.mintGreen"
            width="100px"
            elevation="0"
            type="submit"
          >
            Booking
          </v-btn>
        </v-col>
      </v-row>
    </CustomCard>
  </v-form>
  <v-snackbar
    v-model="completedSubmit"
    timeout="3000"
    color="success"
    @update:modelValue="!completedSubmit ? $router.push({ name: 'home' }) : null"
  >
    your reservation was made successfully, returning to home
  </v-snackbar>
</template>

<script lang="ts">
import CustomCard from '../shared/CustomCard.vue'
import { defineComponent, PropType } from 'vue'
import { useColors } from '@/composables/useColors'
import { useBookingStore } from '@/stores/bookingStore'
import { Hotel } from '@/types/hotel'

export default defineComponent({
  name: 'BookingForm',
  components: {
    CustomCard,
  },
  emits: ['finished'],
  setup () {
    const { colors } = useColors()
    const { addReservation } = useBookingStore()

    return {
      colors,
      addReservation,
    }
  },
  props: {
    hotel: {
      type: Object as PropType<Hotel>,
      required: true,
    },
  },
  data() {
    return {
      form: {
        hotel: {
          name: this.hotel.hotel_name,
          id: this.hotel.id,
        },
        user: {
          name: '',
          lastName: '',
          email: '',
          phone: '',
        },
        accommodation: {
          dates: [],
          rooms: 1,
          guests: 1,
        },
        payment: {
          cardOwnerFirstName: '',
          cardOwnerLastName: '',
          cardName: '',
          cardNumber: '',
          cardExpirationDate: '',
          cardCvc: '',
          installment: null,
        },
      },
      completedSubmit: false,
      rules: [
        (v: string) => !!v || 'Field is required',
      ],
    }
  },
  computed: {
    installmentOptions() {
      const totalPrice = this.totalPrice
      const arr = []
      for (let i = 1; i <= 10; i++) {
        const pricePerInstallment = (totalPrice / i).toFixed(2)
        arr.push(`${i}x of R$ ${pricePerInstallment}`)
      }
      return arr
    },
    totalPrice() {
      return (this.hotel.price_per_night * this.form.accommodation.rooms) * this.days
    },
    days() {
      if (this.form.accommodation.dates == null || this.form.accommodation.dates.length === 0) return 1

      const startDate = new Date(this.form.accommodation.dates[0]).getTime()
      const endDate = new Date(this.form.accommodation.dates[1]).getTime()
      const diffTime = Math.abs(endDate - startDate)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },
  },
  methods: {
    async submit() {
      const formRef = this.$refs.form as { validate: () => Promise<{ valid: boolean }> }
      const { valid } = await formRef.validate()
      if (!valid) {
        return
      }
      await this.addReservation(this.form)
      this.completedSubmit = true
      this.$emit('finished')
    },
  },
})
</script>