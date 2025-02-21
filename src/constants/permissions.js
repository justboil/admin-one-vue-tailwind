// constants/permissions.js

// Categorías de Permisos
export const PERMISSION_CATEGORIES = {
    ANALITICAS: 'ANALITICAS',
    INFRAESTRUCTURAS: 'INFRAESTRUCTURAS',
    PUNTOS_MUESTREO: 'PUNTOS_MUESTREO',
    USUARIOS: 'USUARIOS'
  };
  
  // Permisos detallados por categoría
  export const PERMISSIONS = {
    ANALITICAS: {
      VER: 'analiticas:ver',
      CREAR: 'analiticas:crear',
      EDITAR: 'analiticas:editar',
      ELIMINAR: 'analiticas:eliminar',
      APROBAR: 'analiticas:aprobar',
      EXPORTAR: 'analiticas:exportar'
    },
  
    INFRAESTRUCTURAS: {
      VER: 'infraestructuras:ver',
      CREAR: 'infraestructuras:crear',
      EDITAR: 'infraestructuras:editar',
      ELIMINAR: 'infraestructuras:eliminar'
    },
  
    PUNTOS_MUESTREO: {
      VER: 'puntos_muestreo:ver',
      CREAR: 'puntos_muestreo:crear',
      EDITAR: 'puntos_muestreo:editar',
      ELIMINAR: 'puntos_muestreo:eliminar'
    },
  
    USUARIOS: {
      VER: 'usuarios:ver',
      CREAR: 'usuarios:crear',
      EDITAR: 'usuarios:editar',
      ELIMINAR: 'usuarios:eliminar',
      GESTIONAR_ROLES: 'roles:gestionar'
    }
  };
  
  // Roles predefinidos con sus permisos
  export const ROLES = {
    ADMIN: {
      nombre: 'admin',
      descripcion: 'Administrador con acceso total al sistema',
      permisos: [
        // Todos los permisos de ANALITICAS
        PERMISSIONS.ANALITICAS.VER,
        PERMISSIONS.ANALITICAS.CREAR,
        PERMISSIONS.ANALITICAS.EDITAR,
        PERMISSIONS.ANALITICAS.ELIMINAR,
        PERMISSIONS.ANALITICAS.APROBAR,
        PERMISSIONS.ANALITICAS.EXPORTAR,
        // Todos los permisos de INFRAESTRUCTURAS
        PERMISSIONS.INFRAESTRUCTURAS.VER,
        PERMISSIONS.INFRAESTRUCTURAS.CREAR,
        PERMISSIONS.INFRAESTRUCTURAS.EDITAR,
        PERMISSIONS.INFRAESTRUCTURAS.ELIMINAR,
        // Todos los permisos de PUNTOS_MUESTREO
        PERMISSIONS.PUNTOS_MUESTREO.VER,
        PERMISSIONS.PUNTOS_MUESTREO.CREAR,
        PERMISSIONS.PUNTOS_MUESTREO.EDITAR,
        PERMISSIONS.PUNTOS_MUESTREO.ELIMINAR,
        // Todos los permisos de USUARIOS
        PERMISSIONS.USUARIOS.VER,
        PERMISSIONS.USUARIOS.CREAR,
        PERMISSIONS.USUARIOS.EDITAR,
        PERMISSIONS.USUARIOS.ELIMINAR,
        PERMISSIONS.USUARIOS.GESTIONAR_ROLES
      ]
    },
  
    SUPERVISOR: {
      nombre: 'supervisor',
      descripcion: 'Supervisor con capacidad de gestión y aprobación',
      permisos: [
        // Permisos de ANALITICAS
        PERMISSIONS.ANALITICAS.VER,
        PERMISSIONS.ANALITICAS.CREAR,
        PERMISSIONS.ANALITICAS.EDITAR,
        PERMISSIONS.ANALITICAS.APROBAR,
        PERMISSIONS.ANALITICAS.EXPORTAR,
        // Permisos de INFRAESTRUCTURAS
        PERMISSIONS.INFRAESTRUCTURAS.VER,
        PERMISSIONS.INFRAESTRUCTURAS.EDITAR,
        // Permisos de PUNTOS_MUESTREO
        PERMISSIONS.PUNTOS_MUESTREO.VER,
        PERMISSIONS.PUNTOS_MUESTREO.EDITAR,
        // Permisos de USUARIOS
        PERMISSIONS.USUARIOS.VER
      ]
    },
  
    OPERARIO: {
      nombre: 'operario',
      descripcion: 'Operario con acceso básico a análisis',
      permisos: [
        // Permisos de ANALITICAS
        PERMISSIONS.ANALITICAS.VER,
        PERMISSIONS.ANALITICAS.CREAR,
        PERMISSIONS.ANALITICAS.EDITAR,
        // Permisos de INFRAESTRUCTURAS
        PERMISSIONS.INFRAESTRUCTURAS.VER,
        // Permisos de PUNTOS_MUESTREO
        PERMISSIONS.PUNTOS_MUESTREO.VER
      ]
    },
  
    CONSULTOR: {
      nombre: 'consultor',
      descripcion: 'Usuario con acceso solo de lectura',
      permisos: [
        // Permisos de solo lectura
        PERMISSIONS.ANALITICAS.VER,
        PERMISSIONS.ANALITICAS.EXPORTAR,
        PERMISSIONS.INFRAESTRUCTURAS.VER,
        PERMISSIONS.PUNTOS_MUESTREO.VER
      ]
    }
  };
  
  // Funciones auxiliares para verificar permisos
  export const hasPermission = (userPermissions, requiredPermission) => {
    return userPermissions.includes(requiredPermission);
  };
  
  export const hasAnyPermission = (userPermissions, requiredPermissions) => {
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  };
  
  export const hasAllPermissions = (userPermissions, requiredPermissions) => {
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  };
  
  // Función para obtener todos los permisos de una categoría
  export const getPermissionsByCategory = (category) => {
    return Object.values(PERMISSIONS[category]);
  };
  
  // Función para verificar si un permiso pertenece a una categoría
  export const isPermissionInCategory = (permission, category) => {
    return Object.values(PERMISSIONS[category]).includes(permission);
  };