<template>
  <div class="home-form-card">
    <v-row class="home-form-title">
      <v-col>
        Relax and choose the perfect setting for your vacation!
      </v-col>
    </v-row>
    <v-form>
      <v-row
        class="home-form"
        dense
      >
        <v-col 
          class="form-field-align"
          cols="12"
          lg="4"
          md="4"
          sm="12"
        >
          <v-autocomplete
            v-model="searchForm.location"
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
          lg="4"
          md="4"
          sm="12"
        >
          <v-text-field
            v-model="searchForm.dates"
            variant="outlined"
            alt="Dates"
            label="Dates"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
        <v-col 
          class="form-field-align"
          cols="12"
          lg="4"
          md="4"
          sm="12"
        >
          <v-text-field
            v-model="searchForm.guests"
            alt="Guests and rooms"
            variant="outlined"
            label="Guests and rooms"
            density="compact"
            required
            :color="colors.navyBlue"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer/>
          <v-col class="text-center">
            <v-btn
              :color="colors.navyBlue"
              class="home-form-button"
              elevation="0"
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
        <v-spacer/>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColors } from '@/composables/useColors'
import { useHotel } from '@/composables/useHotel'

export default defineComponent({
  name: 'SearchForm',
  setup() {
    const { colors } = useColors()
    const { loadLocationsOfHotelsWithLimit } = useHotel()

    return {
      colors,
      loadLocationsOfHotelsWithLimit,
    }
  },
  data() {
    return {
      searchHovered: false,
      locations: [] as string[],
      locationsLoading: false,
      searchForm: {
        location: '',
        dates: '',
        guests: '',
      },
    }
  },
  mounted() {
    this.loadLocations('', 5)
  },
  methods: {
    async loadLocations(event: string, limit: number) {
      this.locationsLoading = true
      this.loadLocationsOfHotelsWithLimit(event, 5).then((result) => {
        this.locations = result
      }).finally(() => {
        this.locationsLoading = false
      })
    },
  },
})
</script>