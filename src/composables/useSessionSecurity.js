import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import useLoginStore from '@/stores/login'

export function useSessionSecurity() {
  const loginStore = useLoginStore()
  const router = useRouter()

  const ACTIVITY_EVENTS = [
    'mousedown',
    'mousemove', 
    'keypress',
    'scroll',
    'touchstart',
    'click'
  ]

  // Función para manejar actividad del usuario
  const handleUserActivity = () => {
    if (loginStore.isAuthenticated) {
      loginStore.renewSession()
    }
  }

  // Función para verificar sesión al cargar la página
  const checkInitialSession = () => {
    if (loginStore.isAuthenticated && !loginStore.checkSessionExpiry()) {
      console.warn('Sesión expirada detectada al cargar la página')
      router.push('/login')
    }
  }

  // Configurar listeners de actividad
  const setupActivityListeners = () => {
    ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, handleUserActivity, true)
    })
  }

  // Remover listeners de actividad
  const removeActivityListeners = () => {
    ACTIVITY_EVENTS.forEach(event => {
      document.removeEventListener(event, handleUserActivity, true)
    })
  }

  // Función para manejar el evento beforeunload (cerrar pestaña/navegador)
  const handleBeforeUnload = () => {
    loginStore.clearSessionTimeout()
  }

  onMounted(() => {
    checkInitialSession()
    setupActivityListeners()
    window.addEventListener('beforeunload', handleBeforeUnload)
  })

  onUnmounted(() => {
    removeActivityListeners()
    window.removeEventListener('beforeunload', handleBeforeUnload)
    loginStore.clearSessionTimeout()
  })

  return {
    checkInitialSession,
    setupActivityListeners,
    removeActivityListeners
  }
}