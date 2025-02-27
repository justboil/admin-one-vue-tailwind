import {
  mdiWaterCircle,
} from '@mdi/js'

export default [
  {
    label: 'SinAQ',
    icon: mdiWaterCircle,
    menu: [
      {
        label: 'Excel uploader',
        to: '/sinaq',
        maxRole: 1,
        minRole: 90
        // icon: mdiWaterCircle
      },
      {
        label: 'Formulario Analítica',
        to: {name: "forms"},
        // icon: mdiSquareEditOutline
      },
      {
        label: 'Analíticas',
        to: { name: "tablaAnaliticas" },
        // maxRole: 1,
        // minRole: 90
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
  // {
  //   label: 'Panel de control',
  //   to: {name:'settings'},
  //   icon: mdiCog,
  // }
]
