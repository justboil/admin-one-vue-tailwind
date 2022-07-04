import { defineStore } from 'pinia'
import * as styles from '@/styles'
import { darkModeKey, styleKey } from '@/config'

export const useStyleStore = defineStore('style', {
  state: () => ({
    /* Styles */
    bodyStyle: '',
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

      const style = styles[payload]

      document.body.className = style.body

      if (localStorage[styleKey] !== payload) {
        localStorage.setItem(styleKey, payload)
      }

      for (const key in style) {
        this[`${key}Style`] = style[key]
      }
    },

    setDarkMode (payload = null) {
      const value = payload !== null ? payload : !this.darkMode

      document.documentElement.classList[value ? 'add' : 'remove']('dark')

      localStorage.setItem(darkModeKey, value ? '1' : '0')

      this.darkMode = value
    }
  }
})
