import { createApp } from 'vue'
import App from './App.vue'
import './scss/app.scss'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts()

const pinia = createPinia()

createApp(App)
  .component('VueDatePicker', VueDatePicker)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')