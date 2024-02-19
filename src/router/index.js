import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: Style
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
    meta: {
      title: 'Landing Hub'
    },
    path: '/:asideMenuCategoria/landingview',
    name: 'Landing Hub',
    component: () => import('@/views/LandingView.vue')
  },
  {
    meta: {
      title: 'Xarxa'
    },
    path: '/xarxa',
    name: 'Xarxa',
    component: () => import('@/views/XarxaView.vue')
  },
  {
    meta: {
      title: 'Projectes'
    },
    path: '/projectes/',
    name: 'Projectes',
    component: () => import('@/views/ProjectesView.vue')
  },
  {
    meta: {
      title: 'Reunions'
    },
    path: '/reunions/',
    name: 'Reunions',
    component: () => import('@/views/ReunionsView.vue')
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
      title: 'Visualització de Dades'
    },
    path: '/dades',
    name: 'Visualització de Dades',
    component: () => import('@/views/DadesView.vue')
  },
  {
    meta: {
      title: 'Balanç Social'
    },
    path: '/social',
    name: 'Balanç Social',
    component: () => import('@/views/SocialView.vue')
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
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
