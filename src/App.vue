<template>
  <nav-bar/>
  <aside-menu :menu="menu"/>
  <router-view/>
  <footer-bar/>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'
import { mdiDesktopMac, mdiTable, mdiSquareEditOutline, mdiAccountCircle, mdiLock, mdiViewList, mdiCreditCard, mdiHelpCircle, mdiGithub } from '@mdi/js'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  setup () {
    const store = useStore()

    store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })

    const menu = ref(
      [
        'General',
        [
          {
            to: '/',
            icon: mdiDesktopMac,
            label: 'Dashboard'
          }
        ],
        'Examples',
        [
          {
            to: '/tables',
            label: 'Tables',
            icon: mdiTable,
            updateMark: true
          },
          {
            to: '/forms',
            label: 'Forms',
            icon: mdiSquareEditOutline
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: mdiAccountCircle
          },
          {
            to: '/login',
            label: 'Login',
            icon: mdiLock
          },
          {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: mdiViewList,
            menu: [
              {
                href: '#void',
                label: 'Sub-item One'
              },
              {
                href: '#void',
                label: 'Sub-item Two'
              }
            ]
          }
        ],
        'About',
        [
          {
            href: 'https://admin-one.justboil.me',
            label: 'Premium Demo',
            icon: mdiCreditCard,
            prevent: true
          },
          {
            href: 'https://justboil.me/tailwind-admin-templates',
            label: 'About',
            icon: mdiHelpCircle
          },
          {
            href: 'https://github.com/justboil/admin-one-vue-tailwind',
            label: 'GitHub',
            icon: mdiGithub
          }
        ]
      ]
    )

    return {
      menu
    }
  }
}
</script>
