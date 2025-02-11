import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import PrimeVue from 'primevue/config'

import config from '../formkit.config'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import '@formkit/themes/genesis'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
// import "./assets/base.css"

import './css/main.css'

// Init Pinia
const pinia = createPinia()

// Create Vue app
createApp(App)
  .use(pinia)
  .use(router)
  .use(PrimeVue, { theme: 'none' })
  .use(plugin, defaultConfig(config))
  .use(Vueform, vueformConfig)
  .mount('#app')

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
