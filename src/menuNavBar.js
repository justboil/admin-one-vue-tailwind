import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  
} from '@mdi/js'

export default [
  {
    icon: mdiMenu,
    label: 'Menu',
    menu: [
      {
        icon: mdiClockOutline,
        label: 'Menu primero'
      },
      {
        icon: mdiCloud,
        label: 'Segundo plato'
      },
      {
        isDivider: true
      },
      {
        icon: mdiCrop,
        label: 'Ultima llamada'
      }
    ]
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Mi Perfil',
        to: '/profile'
      },
      {
        icon: mdiCogOutline,
        label: 'Settings'
      },
      {
        icon: mdiEmail,
        label: 'Mensajes'
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Salir',
        isLogout: true
      }
    ]
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true
  },
  
  
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true
  }
]
