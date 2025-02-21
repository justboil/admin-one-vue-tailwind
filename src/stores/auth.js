import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const roles = ref([])

  const isAuthenticated = computed(() => !!session.value)

  const hasRole = (roleToCheck) => roles.value.includes(roleToCheck)

  const login = async (accountData) => {
    // Aquí puedes guardar cualquier dato recibido de MSAL
    // y, si usas supabase, podrías hacer un registro o conexión con el usuario.
    session.value = { account: accountData }
    await loadUserProfile(accountData)
  }

  const loadUserProfile = async (accountData) => {
    try {
      // Ejemplo: usar el email del usuario para buscar sus roles en tu tabla de 'personal'
      const { data, error } = await supabase
        .from('personal')
        .select('*, roles_fk(*)')
        .eq('email', accountData.username)
        .single()

      if (error) throw error

      user.value = data
      // Suponiendo que 'roles' es un arreglo de objetos con propiedad name:
      roles.value = data.roles?.map(r => r.name) || []
    } catch (error) {
      console.error('Error cargando perfil:', error)
    }
  }

  const logout = async () => {
    session.value = null
    user.value = null
    roles.value = []
    // Limpia también la sesión de supabase si aplica.
    await supabase.auth.signOut()
  }

  return {
    user,
    session,
    roles,
    isAuthenticated,
    hasRole,
    login,
    logout
  }
})