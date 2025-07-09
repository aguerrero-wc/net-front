// types/roles.ts - TIPOS ACTUALIZADOS PARA LA API

// Tipo para permisos individuales (como los devuelve la API)
export interface PermissionObject {
  id: string;
  key: string;           // 'users.create', 'content.publish', etc.
  description: string;   // 'Crear usuarios', 'Publicar contenido', etc.
  group: string;         // 'Usuarios', 'Contenido', 'Anuncios', etc.
  createdAt: string;
  updatedAt: string;
}

// Tipo para los roles (como los devuelve la API)
export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  level: number;
  isActive: boolean;
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: PermissionObject[]; // ← Ahora es array de objetos
}

// Tipo para la respuesta de la API
export interface RolesApiResponse {
  data: Role[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos legacy (por compatibilidad)
export type Permission = string; // 'users.create', 'content.publish', etc.
export type SystemRoleSlug = 'system_admin' | 'tenant_admin' | 'content_manager' | 'editor' | 'viewer';

// Mapa de permisos legacy (para retrocompatibilidad)
export const PERMISSIONS: Record<string, string> = {
  // Usuarios
  'users.create': 'Crear usuarios',
  'users.read': 'Ver usuarios',
  'users.update': 'Actualizar usuarios',
  'users.delete': 'Eliminar usuarios',
  
  // Contenido
  'content.create': 'Crear contenido',
  'content.read': 'Ver contenido',
  'content.update': 'Actualizar contenido',
  'content.delete': 'Eliminar contenido',
  'content.publish': 'Publicar contenido',
  
  // Anuncios
  'announcements.create': 'Crear anuncios',
  'announcements.read': 'Ver anuncios',
  'announcements.update': 'Actualizar anuncios',
  'announcements.delete': 'Eliminar anuncios',
  'announcements.publish': 'Publicar anuncios',
  
  // Reportes
  'reports.read': 'Ver reportes',
  'reports.export': 'Exportar reportes',
  
  // Configuración
  'settings.read': 'Ver configuración',
  'settings.update': 'Actualizar configuración'
};

// Función para agrupar permisos por categoría (usando objetos de la API)
export function getPermissionsByCategory(permissions: PermissionObject[] = []): Record<string, PermissionObject[]> {
  return permissions.reduce((groups, permission) => {
    const group = permission.group || 'General';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, PermissionObject[]>);
}

// Función helper para convertir permisos de la API a formato legacy (si es necesario)
export function permissionsToKeys(permissions: PermissionObject[]): string[] {
  return permissions.map(p => p.key);
}

// Función helper para buscar permisos por keys
export function findPermissionsByKeys(allPermissions: PermissionObject[], keys: string[]): PermissionObject[] {
  return allPermissions.filter(p => keys.includes(p.key));
}

// Tipos para formularios
export interface RoleFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  level: number;
  isActive: boolean;
  isSystemRole: boolean;
  permissions: PermissionObject[]; // ← Ahora usa objetos
}

// Tipos para componentes
export interface AdminLoaderData {
  roles: Role[];
  permissions: PermissionObject[];
  success: boolean;
}