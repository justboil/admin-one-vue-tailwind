import { createRouter, createWebHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import AuthGuard from '@/utils/auth-guard'

const routes = [
  {
    meta: {
      title: 'Welcome'
    },
    path: '/',
    name: 'welcome',
    redirect: "/login",
    component: () => import('@/views/LoginView.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      loginRequired : true
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'ยอดส่งวันนี้',
      loginRequired : true
    },
    path: '/today-sends',
    name: 'today-sends',
    component: () => import('@/views/todays/SendTodayView.vue')
  },
  {
    meta: {
      title: 'ยอดค้างจ่าย',
      loginRequired : true
    },
    path: '/debts',
    name: 'debts',
    component: () => import('@/views/DebtsView.vue')
  },
  {
    meta: {
      title: 'รายละเอียดยอดค้างจ่าย',
      loginRequired : true
    },
    path: '/debt/detail/:id',
    name: 'debt-detail',
    component: () => import('@/views/DebtDetailView.vue')
  },
  {
    meta: {
      title: 'ลูกแชร์',
      loginRequired : true
    },
    path: '/members',
    name: 'member',
    component: () => import('@/views/MemberView.vue')
  },
  {
    meta: {
      title: 'วงแชร์',
      loginRequired : true
    },
    path: '/groups',
    name: 'group',
    component: () => import('@/views/GroupView.vue')
  },
  {
    meta: {
      title: 'Tables',
      loginRequired : true
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms',
      loginRequired : true
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile',
      loginRequired : true
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(AuthGuard)

export default router
