// Styles
import '@mdi/font/css/materialdesignicons.css'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  components: {
    VNumberInput,
  },
})
