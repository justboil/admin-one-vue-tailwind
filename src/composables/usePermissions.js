// composables/usePermissions.js
import { ref, computed } from 'vue';
import { PERMISSIONS, ROLES } from '@/constants/permissions';

export function usePermissions() {
  const userPermissions = ref([]);
  const userRoles = ref([]);

  // Verificar si tiene un permiso específico
  const hasPermission = (permission) => {
    return userPermissions.value.includes(permission);
  };

  // Verificar si tiene un rol específico
  const hasRole = (role) => {
    return userRoles.value.includes(role);
  };

  // Verificar si tiene alguno de los permisos
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Verificar si tiene todos los permisos
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  // Cargar permisos del usuario
  const loadUserPermissions = (roles) => {
    userRoles.value = roles;
    const permissions = new Set();
    
    roles.forEach(roleName => {
      const role = ROLES[roleName.toUpperCase()];
      if (role && role.permisos) {
        role.permisos.forEach(permission => permissions.add(permission));
      }
    });
    
    userPermissions.value = Array.from(permissions);
  };

  return {
    userPermissions,
    userRoles,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    loadUserPermissions
  };
}