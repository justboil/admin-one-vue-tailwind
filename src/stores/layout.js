import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideHiddenLayout: false,
    isAsideMobileExpanded: false,
    isAsideLgActive: false
  }),

  actions: {
    asideMobileToggle () {
      this.isAsideMobileExpanded = !this.isAsideMobileExpanded
    }
  }
})
