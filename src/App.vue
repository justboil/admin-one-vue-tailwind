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
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Examples',
        [
          {
            to: '/tables',
            label: 'Tables',
            icon: 'table',
            updateMark: true
          },
          {
            to: '/forms',
            label: 'Forms',
            icon: 'square-edit-outline'
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            to: '/login',
            label: 'Login',
            icon: 'lock'
          },
          {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
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
            icon: 'credit-card',
            prevent: true
          },
          {
            href: 'https://justboil.me/tailwind-admin-templates',
            label: 'About',
            icon: 'help-circle'
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
