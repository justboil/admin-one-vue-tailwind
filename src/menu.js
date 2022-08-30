
export default [
  'รายการวันนี้',
  [
    {
      to: '/today-sends',
      icon: 'cashPlus',
      label: 'ยอดส่งวันนี้',
      countData : 'countSendToday',
    },
    {
      to: '/today-receives',
      icon: 'cashMinus',
      label: 'ยอดรับวันนี้',
      countData : 'countReceiveToday',
    },
    {
      to: '/today-bit',
      icon: 'cashCheck',
      label: 'บิท/เปียร์วันนี้',
      countData : 'countBitToday',
    }
  ],
  'ทั่วไป',
  [
    {
      to: '/dashboard',
      icon: 'chartBoxOutline',
      label: 'ภาพรวมบ้านแชร์'
    },
    {
      to: '/debts',
      icon: 'cashMultiple',
      label: 'ยอดค้างจ่าย',
      countData : 'countDebt',
    },
    {
      to: '/debt',
      icon: 'accountCashOutline',
      label: 'มือเป็น-มือตาย'
    },
    {
      to: '/members',
      icon: 'accountMultipleOutline',
      label: 'ลูกแชร์',
      countData : 'countMember',
    },
    {
      to: '/groups',
      icon: 'homeVariantOutline',
      label: 'วงแชร์'
    },
  ],
  // 'รายงาน',
  // [
  //   {
  //     to: '/tables',
  //     label: 'Tables',
  //     icon: mdiTable
  //   },
  //   {
  //     to: '/forms',
  //     label: 'Forms',
  //     icon: mdiSquareEditOutline
  //   },
  //   {
  //     to: '/ui',
  //     label: 'UI',
  //     icon: mdiTelevisionGuide
  //   },
  //   {
  //     to: '/responsive',
  //     label: 'Responsive',
  //     icon: mdiResponsive
  //   },
  //   {
  //     to: '/',
  //     label: 'Styles',
  //     icon: mdiPalette
  //   },
  //   {
  //     to: '/profile',
  //     label: 'Profile',
  //     icon: mdiAccountCircle
  //   },
  //   {
  //     to: '/login',
  //     label: 'Login',
  //     icon: mdiLock
  //   },
  //   {
  //     to: '/error',
  //     label: 'Error',
  //     icon: mdiAlertCircle
  //   },
  //   {
  //     label: 'Dropdown',
  //     icon: mdiViewList,
  //     menu: [
  //       {
  //         label: 'Item One'
  //       },
  //       {
  //         label: 'Item Two'
  //       }
  //     ]
  //   }
  // ],
  // 'About',
  // [
  //   {
  //     href: 'https://tailwind-vue.justboil.me/',
  //     label: 'Premium version',
  //     icon: mdiMonitorShimmer,
  //     target: '_blank'
  //   },
  //   {
  //     href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //     label: 'GitHub',
  //     icon: mdiGithub,
  //     target: '_blank'
  //   }
  // ]
]
