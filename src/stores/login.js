import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useLoginStore = defineStore('loginStore', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  const userName = ref(localStorage.getItem('userName') || '')
  const userEmail = ref(localStorage.getItem('userEmail') || '')

  // Watchers para persistencia automática
  watch(isAuthenticated, (newValue) => {
    localStorage.setItem('isAuthenticated', newValue)
  })

  watch(user, (newValue) => {
    if (newValue) {
      localStorage.setItem('user', JSON.stringify(newValue))
    }
  })

  const userAvatar = computed(
    () =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
        /[^a-z0-9]+/gi,
        '-'
      )}`
  )
  const login = (userData) => {
    isAuthenticated.value = true
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }
  const logout = async () => {
    user.value = null
    isAuthenticated.value = false
    userName.value = ''
    userEmail.value = ''
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const  setUser=(payload)=> {
    if (payload.name) {
      userName.value = payload.name
      localStorage.setItem('userName', payload.name)
    }
    if (payload.username) {
      userEmail.value = payload.username
      localStorage.setItem('userEmail', payload.username)
    }
  }

  const setAccount = (account) => {
    user.value = account
  }

  const setIsAuthenticated = (valor) => {
    isAuthenticated.value = valor
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
    login
  }
})

export default useLoginStore
