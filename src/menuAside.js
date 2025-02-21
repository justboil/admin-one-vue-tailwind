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
        // icon: mdiWaterCircle
      },
      {
        label: 'Formulario Analitica',
        to: {name: "forms"},
        // icon: mdiSquareEditOutline
      },
      {
        label: 'Analiticas',
        to: { name: "tablaAnaliticas" },
        maxRole:1
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
