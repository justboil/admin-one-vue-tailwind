import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/HomeView.vue'
import ExcelUploaderView from '@/views/ExcelUploaderView.vue'

const routes = [
  {
    meta: {
      title: 'Aqlara Home'
    },
    path: '/',
    name: 'home',
    component: ExcelUploaderView
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Panel de Control'
    },
    path: '/settings',
    name: 'settings',
    component: ()=>import('@/views/SettingsView.vue')
  },
  {
    title: 'Operarios',
  path: '/operarios',
  name: 'operarios',
  component: () => import('@/views/OperariosView.vue')  
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
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
  },
  {
    meta: {
      title: 'Sinaq'
    },
    path: '/sinaq',
    name: 'sinaq',
    component: () => import('@/views/ExcelUploaderView.vue')
  },
  {
    meta: {
      title: 'Style selector'
    },
    path: '/style',
    name: 'style',
    component: () => import('@/views/StyleView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
