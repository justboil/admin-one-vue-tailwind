import { defineStore } from 'pinia'
import * as styles from '@/styles'
import { darkModeKey, styleKey } from '@/config'

export const useStyleStore = defineStore('style', {
  state: () => ({
    /* Styles */
    bgStyle: '',
    asideStyle: '',
    asideBrandStyle: '',
    asideMenuCloseLgStyle: '',
    asideMenuLabelStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuItemInactiveStyle: '',
    asideSubmenuListStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    navBarMenuListUpperLabelStyle: '',
    overlayStyle: '',

    /* Dark mode */
    darkMode: false,
  }),
  actions: {
    setStyle (payload) {
      if (!styles[payload]) {
        return
      }

      localStorage?.setItem(styleKey, payload)

      const style = styles[payload]

      for (const key in style) {
        this[`${key}Style`] = style[key]
      }
    },

    setDarkMode (payload = null) {
      this.darkMode = payload !== null ? payload : !this.darkMode

      localStorage?.setItem(darkModeKey, this.darkMode ? '1' : '0')

      document?.documentElement.classList[this.darkMode ? 'add' : 'remove']('dark-scrollbars')
    }
  }
})
