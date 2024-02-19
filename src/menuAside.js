import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact
} from '@mdi/js'

export default [
  {
    to: '/landingview',            
    icon: mdiMonitor,
    label: 'Espai Global',
    menu: [
      {
        to: '/dades',
        label: 'Visualització de dades'
      },
      {
        to: '/social',
        label: 'Balanç Social'
      }
    ]
  },
  {
    to: '/landingview',            
    icon: mdiMonitor,
    label: 'Espai Usuària',
    menu: [
      {
        to: '/profile',
        label: 'El meu perfil'
      },
      {
        to: '/missatges',
        label: 'Els meus missatges'
      }
    ]
  },
  {
    to: '/landingview',            
    icon: mdiMonitor,
    label: 'Xarxa',
    menu: [
      {
        to: '/xarxa_dashboard',
        label: 'Veure-ho tot'
      },
      {
        to: '/afegir_membre_xarxa',
        label: 'Afegir membre'
      }
    ]
  },
  {
    to: '/landingview',
    label: 'Projectes',
    icon: mdiViewList,
    menu: [
      {
        to: '/projectes',
        label: 'Tots els projectes'
      },
      {
        label: 'Els teus projectes'
      }
    ]
  },
]
