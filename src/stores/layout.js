import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideMobileExpanded: false,
    isAsideLgActive: false
  }),

  actions: {
    asideMobileToggle (payload = null) {
      const isShow = payload !== null ? payload : !this.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('overflow-hidden', 'lg:overflow-visible')

      this.isAsideMobileExpanded = isShow
    },

    asideLgToggle (payload = null) {
      this.isAsideLgActive = payload !== null ? payload : !this.isAsideLgActive
    }
  }
})
