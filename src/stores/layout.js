import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: true,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
  }),
  actions: {
    asideMobileToggle (payload = null) {
      const isShow = payload !== null ? payload : !this.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      this.isAsideMobileExpanded = isShow
    },

    asideLgToggle (payload = null) {
      this.isAsideLgActive = payload !== null ? payload : !this.isAsideLgActive
    },

    fullScreenToggle (payload) {
      this.isFullScreen = payload

      document.documentElement.classList[payload ? 'add' : 'remove']('full-screen')
    },
  }
})
