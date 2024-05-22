import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkModeStore = defineStore('darkMode', () => {
  const isEnabled = ref(false)

  function set(payload = null) {
    isEnabled.value = payload !== null ? payload : !isEnabled.value

    if (typeof document !== 'undefined') {
      document.body.classList[isEnabled.value ? 'add' : 'remove']('dark-scrollbars')

      document.documentElement.classList[isEnabled.value ? 'add' : 'remove'](
        'dark',
        'dark-scrollbars-compat'
      )
    }

    // You can persist dark mode setting
    // if (typeof localStorage !== 'undefined') {
    //   localStorage.setItem('darkMode', isEnabled.value ? '1' : '0')
    // }
  }

  return {
    isEnabled,
    set
  }
})
