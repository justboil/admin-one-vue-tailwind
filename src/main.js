import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'

import './css/main.css'

/* Init Pinia */
const pinia = createPinia()

/* Create Vue app */
createApp(App).use(router).use(pinia).mount('#app')

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

/* Fetch sample data */
mainStore.fetch('clients')
mainStore.fetch('history')

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

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

  /* Full screen mode */
  layoutStore.fullScreenToggle(!!to.meta.fullScreen)
})
