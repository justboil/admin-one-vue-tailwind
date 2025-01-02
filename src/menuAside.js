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
  // {
  //   to: '/dashboard',
  //   icon: mdiMonitor,
  //   label: 'Dashboardd'
  // },
  // {
  //   to: '/sinaq',
  //   icon: mdiWaterCircle,
  //   label: 'SinAQ'
  // },
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
    ]
  },
  {
    label: 'Panel de control',
    to: {name:'settings'},
    icon: mdiCog,

  }
  // {
  //   to: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable
  // },
  // {
  //   to: '/forms',
  //   label: 'Formulario',
  //   icon: mdiSquareEditOutline
  // }
  // {
  //   to: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide
  // },
  // {
  //   to: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive
  // },
  // {
  //   to: '/',
  //   label: 'Styles',
  //   icon: mdiPalette
  // },
  // {
  //   to: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle
  // },
  // {
  //   to: '/login',
  //   label: 'Login',
  //   icon: mdiLock
  // },
  // {
  //   to: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One'
  //     },
  //     {
  //       label: 'Item Two'
  //     }
  //   ]
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //   label: 'GitHub',
  //   icon: mdiGithub,
  //   target: '_blank'
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'React version',
  //   icon: mdiReact,
  //   target: '_blank'
  // }
]
