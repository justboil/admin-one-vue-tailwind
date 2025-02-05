import {
  mdiWaterCircle,
  mdiSquareEditOutline,
  mdiCog,
  // mdiAccountCircle,
  // mdiMonitor,
  // mdiGithub,
  // mdiLock,
  // mdiAlertCircle,
  // mdiTable,
  // mdiViewList,
  // mdiTelevisionGuide,
  // mdiResponsive,
  // mdiPalette,
  // mdiReact,
  // mdiCogOutline,
} from '@mdi/js'

export default [
  {
    label: 'SinAQ',
    icon: mdiWaterCircle,
    menu: [
      {
        label: 'Excel uploader',
        to: '/sinaq',
        // icon: mdiWaterCircle
      },
      {
        label: 'Formulario Analitica',
        to: {name: "forms"},
        // icon: mdiSquareEditOutline
      },
      {
        label: 'Analiticas',
        to: {name: "tablaAnaliticas"},
        // icon: mdiSquareEditOutline
      },
      {
        label: 'Mapa',
        to: {name: "mapa"},
      },
      // {
      //   label: 'Prime Table Example',
      //   to: {name: "prime-table"},
      //   icon: mdiSquareEditOutline
      // }
    ]
  },
  {
    label: 'Panel de control',
    to: {name:'settings'},
    icon: mdiCog,
  }
]
