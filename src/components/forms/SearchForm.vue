<template>
  <div class="home-form-card">
    <v-row class="home-form-title">
      <v-col>
        Relax and choose the perfect setting for your vacation!
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row
        class="home-form"
        dense
      >
        <v-col 
          class="form-field-align"
          cols="12"
          lg="3"
          md="3"
          sm="12"
        >
          <v-autocomplete
            v-model="searchForm.location"
            :rules="locationRules"
            :items="locations"
            :loading="locationsLoading"
            variant="outlined"
            alt="Hotel location"
            label="Hotel location"
            density="compact"
            required
            :color="colors.navyBlue"
            @update:search="loadLocations( $event, 5 )"
          />
        </v-col>
        <v-col 
          class="form-field-align"
          cols="12"
          lg="3"
          md="3"
          sm="12"
        >
          <VueDatePicker
            class="home-form-datepicker"
            v-model="searchForm.dates"
            range
            format="dd/mm/yyyy"
          />
        </v-col>
        <v-col 
          class="form-field-align"
          cols="12"
          lg="2"
          md="2"
          sm="12"
        >
          <v-number-input
            v-model="searchForm.rooms"
            controlVariant="stacked"
            variant="outlined"
            density="compact"
            label="Rooms"
            required
            :reverse="false"
            :min="1"
            :max="10"
            :hideInput="false"
            :inset="false"
          />
        </v-col>
        <v-col 
          class="form-field-align"
          cols="12"
          lg="2"
          md="2"
          sm="12"
        >
          <v-number-input
            v-model="searchForm.guests"
            controlVariant="stacked"
            variant="outlined"
            density="compact"
            label="Guests"
            required
            :reverse="false"
            :min="searchForm.rooms"
            :max="10"
            :hideInput="false"
            :inset="false"
          />
        </v-col>
        <v-col
          class="text-center"
          cols="12"
          lg="2"
          md="2"
          sm="12"
        >
          <v-btn
            :color="colors.navyBlue"
            class="home-form-button"
            elevation="0"
            @click="validateSearchForm()"
            @mouseover="searchHovered = true"
            @mouseleave="searchHovered = false"
          >
            <span class="button-text">
              Search
            </span>
            <v-icon class="button-icon">
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColors } from '@/composables/useColors'
import { useHotel } from '@/composables/useHotel'
import { useSearchStore } from '@/stores/searchStore'

export default defineComponent({
  name: 'SearchForm',
  setup() {
    const { colors } = useColors()
    const { loadLocationsOfHotelsWithLimit } = useHotel()
    const { setSearchForm, getSearchForm } = useSearchStore()

    return {
      colors,
      loadLocationsOfHotelsWithLimit,
      setSearchForm,
      getSearchForm,
    }
  },
  data() {
    return {
      searchHovered: false,
      locations: [] as string[],
      locationsLoading: false,
      locationRules: [
        (v: string) => !!v || 'Location is required',
      ],
      searchForm: {
        location: '',
        dates: '',
        guests: 1,
        rooms: 1,
      },
    }
  },
  mounted() {
    this.searchForm = this.getSearchForm()
    this.loadLocations('')
    this.loadQueryParams()
  },
  emits: ['search'],
  methods: {
    async validateSearchForm() {
      const formRef = this.$refs.form as { validate: () => Promise<{ valid: boolean }> }
      const { valid } = await formRef.validate()
      if (!valid) {
        return
      }

      this.setSearchForm(this.searchForm)
      this.$emit('search', this.searchForm)
    },
    async loadLocations(event: string, limit = 5) {
      this.locationsLoading = true
      this.loadLocationsOfHotelsWithLimit(event, limit).then((result) => {
        this.locations = result
      }).finally(() => {
        this.locationsLoading = false
      })
    },
    loadQueryParams() {
      const query = this.$route.query

      this.searchForm.location = query.location as string || 'new york'
      this.searchForm.dates = query.dates as string || ''
      this.searchForm.guests = parseInt(query.guests as string) || 1
      this.searchForm.rooms = parseInt(query.rooms as string) || 1

      this.setSearchForm(this.searchForm)
    },
  },
})
</script>