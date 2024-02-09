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
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/xarxa',
    label: 'Xarxa',
    icon: mdiTable
  },
  {
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
