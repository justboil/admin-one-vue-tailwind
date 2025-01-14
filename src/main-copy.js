import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import '@formkit/themes/genesis'
// import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
// import Aura from '@primevue/themes/aura'
// import 'primevue/resources/themes/lara-light-indigo/theme.css'
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
// import "./assets/base.css"

import './css/main.css'
// import { supabase } from './services/supabase'
// import { definePreset } from '@primevue/themes'

// Init Pinia
const pinia = createPinia()
// const MyPreset = definePreset(Aura, {
//   semantic: {
//       primary: {
//           50: '{blue.50}',
//           100: '{blue.100}',
//           200: '{blue.200}',
//           300: '{blue.300}',
//           400: '{blue.400}',
//           500: '{blue.500}',
//           600: '{blue.600}',
//           700: '{blue.700}',
//           800: '{blue.800}',
//           900: '{blue.900}',
//           950: '{blue.950}'
//       }
//   }
// });

// Create Vue app
createApp(App)
.use(pinia)
.use(router)
  .use(plugin, defaultConfig(config))
  .use(Vueform, vueformConfig)
  .mount('#app')

  
  // .use(PrimeVue, { unstyled:true })
  // .use(PrimeVue, { unstyled: true })

// Init main store
const mainStore = useMainStore(pinia)
// await supabase.initialize() // Uso de Top-level await

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = 'AQLARA Admin Panel'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
