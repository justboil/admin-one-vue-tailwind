import { set } from 'date-fns'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useLoginStore = defineStore('loginStore', () => {
  const user = ref(null)
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') || false)

  const userName = ref('')
  const userEmail = ref('')

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

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.username) {
      userEmail.value = payload.username
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
