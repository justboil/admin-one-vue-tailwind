import {
  mdiMenu,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiAccountCog,
  mdiMapClock,
  mdiTestTube,
  mdiSetCenter,
  
} from '@mdi/js'

export default [
  {
    icon: mdiMenu,
    label: 'Menu',
    menu: [
      {
        icon:  mdiAccountCog,
        label: 'Operarios',
        to: {name:'operarios'}
      },
      {
        icon: mdiSetCenter,
        label: 'Unidades Operativas',
        to: {name:'unidadesOperativas'}
      },
      {
        icon: mdiMapClock,
        label: 'Zonas'
      },
      {
        isDivider: true
      },
      {
        icon: mdiTestTube,
        label: 'analiticas'
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
