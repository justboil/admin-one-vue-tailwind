import { createApp } from 'vue'
import { createPinia } from 'pinia'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'
import vSelect from "vue-select";
import Datepicker from '@vuepic/vue-datepicker';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';
import '@vuepic/vue-datepicker/dist/main.css'
import './css/main.css'
import "vue-select/dist/vue-select.css";

/* Init Pinia */
const pinia = createPinia()

/* Create Vue app */
createApp(App)
.use(router)
.use(pinia)
.use(mdiVue,{icons:mdijs})
.use(Loading,{
  loader: 'dots',
  color: '#FFFFFF',
  backgroundColor : '#0A1128',
  opacity: 0.96,
  zIndex : 100}
)
.component("v-select", vSelect)
.component('Datepicker', Datepicker)
.mount('#app')

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)



/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Thaosharehouse'

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.asideMobileToggle(false)
  layoutStore.asideLgToggle(false)
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
