import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiMonitorShimmer,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiCashPlus,
  mdiCashMinus,
  mdiCashLock,
  mdiHomeLightningBoltOutline,
  mdiHomePlusOutline,
  mdiHomeEditOutline,
  mdiHomeRemoveOutline,
  mdiHomeClockOutline,
  mdiHomeVariantOutline
} from '@mdi/js'


export default [
  'รายการวันนี้',
  [
    {
      to: '/today-sends',
      icon: 'cashPlus',
      label: 'ยอดส่งวันนี้',
      countData : 'countSendToday',
      countColor : 'success'
    },
    {
      to: '/today-receives',
      icon: 'cashMinus',
      label: 'ยอดรับวันนี้',
      countData : 'countReceiveToday',
      countColor : 'danger'
    },
    {
      to: '/today-bit',
      icon: 'homeLightningBoltOutline',
      label: 'บิท/เปียร์วันนี้',
      countData : 'countBitToday',
      countColor : 'warning'
    }
  ],
  'วงแชร์',
  [
    {
      to: '/group-create',
      icon: 'homePlusOutline',
      label: 'สร้างวงแชร์'
    },
    {
      to: '/today-sends',
      icon: 'homeClockOutline',
      label: 'วงวันนี้',
      countData : 'countSendToday'
    },
    {
      to: '/today-sends',
      icon: 'homeVariantOutline',
      label: 'วงกำลังเล่น',
      countData : 'countSendToday'
    },
    {
      to: '/today-sends',
      icon: 'homeEditOutline',
      label: 'วงสร้างใหม่',
      countData : 'countSendToday'
    },
    {
      to: '/today-sends',
      icon: 'homeRemoveOutline',
      label: 'วงจบแล้ว',
      countData : 'countSendToday'
    },
  ],
  'ทั่วไป',
  [
    {
      to: '/dashboard',
      icon: 'monitor',
      label: 'ภาพรวมบ้านแชร์'
    },
    {
      to: '/debts',
      icon: 'cashLock',
      label: 'ยอดค้างจ่าย',
      countData : 'countDebt',
      countColor : 'warning'
    },
    {
      to: '/debt',
      icon: 'cashLock',
      label: 'มือเป็น-มือตาย'
    },
    {
      to: '/members',
      icon: 'accountMultiple',
      label: 'ลูกแชร์',
      countData : 'countMember',
      countColor : 'info'
    }
  ],
  'รายงาน',
  [
    {
      to: '/tables',
      label: 'Tables',
      icon: mdiTable
    },
    {
      to: '/forms',
      label: 'Forms',
      icon: mdiSquareEditOutline
    },
    {
      to: '/ui',
      label: 'UI',
      icon: mdiTelevisionGuide
    },
    {
      to: '/responsive',
      label: 'Responsive',
      icon: mdiResponsive
    },
    {
      to: '/',
      label: 'Styles',
      icon: mdiPalette
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: mdiAccountCircle
    },
    {
      to: '/login',
      label: 'Login',
      icon: mdiLock
    },
    {
      to: '/error',
      label: 'Error',
      icon: mdiAlertCircle
    },
    {
      label: 'Dropdown',
      icon: mdiViewList,
      menu: [
        {
          label: 'Item One'
        },
        {
          label: 'Item Two'
        }
      ]
    }
  ],
  'About',
  [
    {
      href: 'https://tailwind-vue.justboil.me/',
      label: 'Premium version',
      icon: mdiMonitorShimmer,
      target: '_blank'
    },
    {
      href: 'https://github.com/justboil/admin-one-vue-tailwind',
      label: 'GitHub',
      icon: mdiGithub,
      target: '_blank'
    }
  ]
]
