// vueform.config.(js|ts)

import es from '@vueform/vueform/locales/es'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

// You might place these anywhere else in your project
import '@vueform/vueform/dist/vueform.css';

export default defineConfig({
  theme: vueform,
  locales: { es },
  locale: 'es',
})