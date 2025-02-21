// composables/useAuth.js
import { ref, computed } from 'vue';
import { usePermissions } from './usePermissions';
import { supabase } from '@/services/supabase';
import { loginWithMicrosoft, getUserProfile } from '@/services/msalConfig';

export function useAuth() {
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  const { 
    loadUserPermissions, 
    hasPermission, 
    hasRole 
  } = usePermissions();

  const isAuthenticated = computed(() => !!user.value);

  // Login con Microsoft y carga de permisos
  const login = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Login con Microsoft
      const msalResult = await loginWithMicrosoft();
      const profile = await getUserProfile();

      // Obtener roles y permisos de Supabase
      const { data: userData, error: dbError } = await supabase
        .from('usuarios')
        .select(`
          *,
          usuario_roles (
            roles (
              nombre,
              permisos
            )
          )
        `)
        .eq('email', profile.email)
        .single();

      if (dbError) throw dbError;

      // Extraer roles del usuario
      const userRoles = userData.usuario_roles.map(ur => ur.roles.nombre);
      
      // Cargar permisos basados en los roles7Q71Do
      loadUserPermissions(userRoles);

      // Guardar datos del usuario
      user.value = {
        ...profile,
        roles: userRoles
      };

    } catch (e) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    // Lógica de logout
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    hasPermission,
    hasRole,
    login,
    logout
  };
}