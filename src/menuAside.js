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
    to: '/global/landingview',            
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
    to: '/user/landingview',            
    icon: mdiMonitor,
    label: 'Espai Usuària',
    menu: [
      {
        to: '/profile',
        label: 'El meu perfil'
      },
      {
        // to: '/missatges',
        label: 'Els meus missatges'
      }
    ]
  },
  {
    to: '/xarxa/landingview',            
    icon: mdiMonitor,
    label: 'Xarxa',
    menu: [
      {
        to: '/xarxa',
        label: 'Veure-ho tot'
      },
      {
        // to: '/afegir_membre_xarxa',
        label: 'Afegir membre'
      }
    ]
  },
  {
    to: '/projectes/landingview',
    label: 'Projectes',
    icon: mdiViewList,
    menu: [
      {
        to: '/projectes',
        label: 'Tots els projectes'
      },
      {
        // to: '/projectes/1',
        label: 'Els teus projectes'
      }
    ]
  },
  {
    to: '/reunions/landingview',
    label: 'Reunions',
    icon: mdiViewList,
    menu: [
      {
        to: '/reunions',
        label: 'Totes les reunions'
      },
      {
        to: '/reunions',
        label: 'propera Natural Focus'
      }
    ]
  },
]
