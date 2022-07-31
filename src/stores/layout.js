import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideHiddenLayout: false,
    isAsideMobileExpanded: false,
    isAsideLgActive: false
  }),

  actions: {
    asideMobileToggle (payload = null) {
      this.isAsideMobileExpanded = payload !== null ? payload : !this.isAsideMobileExpanded
    },

    // asideLgToggle (payload = null) {
    //   this.isAsideLgActive = payload !== null ? payload : !this.isAsideLgActive
    // }
  }
})
