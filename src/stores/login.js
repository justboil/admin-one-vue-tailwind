import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getUserProfile } from '@/services/msalConfig'


export const useLoginStore = defineStore('loginStore', () => {
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)
  const isAuthenticated = ref(sessionStorage.getItem('isAuthenticated') === 'true')
  const userName = ref(sessionStorage.getItem('userName') || '')
  const userEmail = ref(sessionStorage.getItem('userEmail') || '')
  // const userAvatar = ref(sessionStorage.getItem('userAvatar') || '')
  const userLogged = ref(JSON.parse(sessionStorage.getItem('userLogged')) || {})
  const profilePhoto = ref(sessionStorage.getItem('profilePhoto') || '')
  const userAutenticated = ref(sessionStorage.getItem('userAutenticated') || '')
  const userRole=ref(sessionStorage.getItem('userRole') || '')
  const userId=ref(sessionStorage.getItem('userId') || '')
  
  // Variables para manejo de sesión
  const sessionTimeout = ref(null)
  const SESSION_DURATION = 30 * 60 * 1000 // 30 minutos en ms

  const userAvatar = computed(
    () =>      
    `https://ui-avatars.com/api/?name=${userName.value}&background=random&font-size=0.75&bold=true&color=fff`
  )
   // Watchers para persistencia segura
   watch([isAuthenticated, user, userName, userEmail, userAvatar, userLogged, profilePhoto, userAutenticated, userRole,userId], ([newAuth, newUser, newName, newEmail, newAvatar,newUserLogged, newProfilePhoto, newUserAutenticated, newUserRole, newUserId]) => {
    sessionStorage.setItem('isAuthenticated', newAuth)
    if (newUser) sessionStorage.setItem('user', JSON.stringify(newUser))
    if (newName) sessionStorage.setItem('userName', newName)
    if (newEmail) sessionStorage.setItem('userEmail', newEmail)
    if (newAvatar) sessionStorage.setItem('userAvatar', newAvatar)
    if (newUserLogged) sessionStorage.setItem('userLogged', JSON.stringify(newUserLogged))
     if (newProfilePhoto) sessionStorage.setItem('profilePhoto', newProfilePhoto)
     if (newUserAutenticated) sessionStorage.setItem('userAutenticated', newUserAutenticated)
      if (newUserRole) sessionStorage.setItem('userRole', newUserRole)
      if (newUserId) sessionStorage.setItem('userId', newUserId)
  })




  // Función para limpiar timeout de sesión
  const clearSessionTimeout = () => {
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
      sessionTimeout.value = null
    }
  }

  // Función para iniciar timeout de sesión
  const startSessionTimeout = () => {
    clearSessionTimeout()
    
    sessionTimeout.value = setTimeout(() => {
      console.warn('Sesión expirada por inactividad')
      logout()
      // Opcional: mostrar mensaje al usuario
      alert('Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.')
    }, SESSION_DURATION)
  }

  // Función para renovar sesión (reiniciar timeout)
  const renewSession = () => {
    if (isAuthenticated.value) {
      const lastActivity = Date.now()
      sessionStorage.setItem('lastActivity', lastActivity.toString())
      startSessionTimeout()
    }
  }

  // Verificar si la sesión ha expirado
  const checkSessionExpiry = () => {
    const lastActivity = sessionStorage.getItem('lastActivity')
    if (lastActivity) {
      const timeDiff = Date.now() - parseInt(lastActivity)
      if (timeDiff > SESSION_DURATION) {
        logout()
        return false
      }
    }
    return true
  }

  const login = async (userData) => {
    try {
      isAuthenticated.value = true
      user.value = userData
      
      // Inicializar timestamp de sesión
      const loginTime = Date.now()
      sessionStorage.setItem('loginTime', loginTime.toString())
      sessionStorage.setItem('lastActivity', loginTime.toString())
      
      // Iniciar timeout de sesión
      startSessionTimeout()
      
      // Obtener perfil completo
      const userProfile = await getUserProfile()
      if (userProfile) {
        console.log('USERPROFILE:', userProfile);
        userAutenticated.value=userProfile
        userName.value = userProfile.displayName
        userEmail.value = userProfile.email
        // userAvatar.value = userProfile.photoUrl
        userLogged.value = { ...userLogged.value, ...userProfile }
      }
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }
  
  const logout = async () => {
    // Limpiar timeout de sesión
    clearSessionTimeout()
    
    user.value = null
    isAuthenticated.value = false
    userName.value = ''
    userEmail.value = ''
    // sessionStorage.removeItem('isAuthenticated')
    // sessionStorage.removeItem('user')
    sessionStorage.clear()
  }

  const getUserLogged=computed(() => {
    return userLogged.value
  })

  const  setUser=(payload)=> {
    if (payload.name) {
      userName.value = payload.name
      sessionStorage.setItem('userName', payload.name)
    }
    if (payload.username) {
      userEmail.value = payload.username
      sessionStorage.setItem('userEmail', payload.username)
    }
  }

  const setUserRole = (role) => {
     // Si userLogged.value no es un objeto, lo inicializamos
     if (typeof userLogged.value !== 'object' || userLogged.value === null) {
      userLogged.value = {}
    }
    userLogged.value = {
      ...userLogged.value,
      role: role
    }
    userRole.value = role
  }
  const setUserId = (id) => {
     // Si userLogged.value no es un objeto, lo inicializamos
     if (typeof userLogged.value !== 'object' || userLogged.value === null) {
      userLogged.value = {}
    }
    userLogged.value = {
      ...userLogged.value,
      id: id
    }
    userId.value = id
  }


  const setAccount = (account) => {
    user.value = account
  }

  const setIsAuthenticated = (valor) => {
    isAuthenticated.value = valor
  }
  const setProfilePhoto = (valor) => {
    profilePhoto.value = valor
  }

  return {
    user,
    isAuthenticated,
    setIsAuthenticated,
    setAccount,
    userAvatar,
    setUser,
    userName,
    userEmail,
    logout,
    login,
    userLogged,
    profilePhoto,
    setProfilePhoto,
    setUserRole,
    userRole,
    getUserLogged,
    setUserId,
    userId,
    // Funciones de seguridad de sesión
    renewSession,
    checkSessionExpiry,
    clearSessionTimeout
  }
})

export default useLoginStore
