import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/HomeView.vue'
import ExcelUploaderView from '@/views/ExcelUploaderView.vue'
import useLoginStore from '@/stores/login';
// import LoginAqlaraView from '@/views/LoginAqlaraView.vue';

// const loginStore = useLoginStore();

const routes = [
  {
    meta: {
      title: 'Aqlara Login'
    },
    path: '/login',
    name: 'login',
    component: import('@/views/LoginAqlaraView.vue')
  },
  {
    meta: {
      title: 'Aqlara Login',
      requiresAuth: true
    },
    path: '/admin',
    name: 'admin',
    children: [
      {
        title: 'Operarios',
      path: '/admin/operarios',
      name: 'operarios',
      component: () => import('@/views/OperariosView.vue')  
      },


    ],
  },
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
    component: () => import('@/views/FormAnaliticaView.vue')
  },
  {
    meta: {
      title: 'Tabla de Analiticas'
    },
    path: '/tablaAnaliticas',
    name: 'tablaAnaliticas',
    component: () => import('@/views/AnaliticsTableView.vue')
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
    path: '/login_original',
    name: 'login_original',
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



// Guard de navegacion

router.beforeEach((to, from, next) => {
  // const { useLoginStore } = require('@/stores/login')
  const loginStore = useLoginStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // if (requiresAuth && !localStorage.getItem('token')) {
  if (requiresAuth && !loginStore.isAuthenticated) {
    
    next({name:'login'});
  } else {
    next();
  }
  // to and from are both route objects. must call `next`.
})

export default router
