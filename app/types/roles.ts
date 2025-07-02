// types/roles.ts

// Tipos que coinciden con las entidades del backend
export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  permissions: string[];
  level: number;
  isActive: boolean;
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone?: string;
  timezone?: string;
  language: string;
  preferences?: Record<string, any>;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  lastLoginIp?: string;
  isActive: boolean;
  isBlocked: boolean;
  blockedReason?: string;
  tenantRoles: UserTenantRole[];
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

export interface UserTenantRole {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  role: Role;
  user?: User;
  additionalPermissions?: string[];
  deniedPermissions?: string[];
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  assignedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  isExpired: boolean;
  hasStarted: boolean;
  isCurrentlyActive: boolean;
}

// Configuración de roles del sistema
export const SYSTEM_ROLES = {
  system_admin: "Administrador del Sistema",
  tenant_admin: "Administrador del Cliente", 
  content_manager: "Gestor de Contenidos",
  editor: "Editor",
  viewer: "Visualizador"
} as const;

export type SystemRoleSlug = keyof typeof SYSTEM_ROLES;

// Configuración de permisos del sistema
export const PERMISSIONS = {
  // Usuarios
  'users.create': 'Crear usuarios',
  'users.read': 'Ver usuarios', 
  'users.update': 'Editar usuarios',
  'users.delete': 'Eliminar usuarios',
  
  // Roles
  'roles.create': 'Crear roles',
  'roles.read': 'Ver roles',
  'roles.update': 'Editar roles', 
  'roles.delete': 'Eliminar roles',
  
  // Tenants
  'tenants.create': 'Crear clientes',
  'tenants.read': 'Ver clientes',
  'tenants.update': 'Editar clientes',
  'tenants.delete': 'Eliminar clientes',
  
  // Contenidos
  'content.create': 'Crear contenidos',
  'content.read': 'Ver contenidos',
  'content.update': 'Editar contenidos',
  'content.delete': 'Eliminar contenidos',
  'content.publish': 'Publicar contenidos',
  
  // Comunicados
  'announcements.create': 'Crear comunicados',
  'announcements.read': 'Ver comunicados',
  'announcements.update': 'Editar comunicados',
  'announcements.delete': 'Eliminar comunicados',
  'announcements.publish': 'Publicar comunicados',
  
  // Reportes
  'reports.read': 'Ver reportes',
  'reports.export': 'Exportar reportes',
  
  // Configuración
  'settings.read': 'Ver configuración',
  'settings.update': 'Editar configuración',
  
  // Sistema
  'system.admin': 'Administración del sistema',
  'system.audit': 'Ver auditoría del sistema'
} as const;

export type Permission = keyof typeof PERMISSIONS;

// Tipos para el loader y datos de administración
export interface AdminLoaderData {
  // currentUserRole: SystemRoleSlug;
  rolesq: Role[];
  // systemStats: {
  //   totalTenants: number;
  //   totalUsers: number;
  //   activeUsers: number;
  //   totalRoles: number;
  // };
}

// Tipos para formularios de roles
export interface CreateRoleForm {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  permissions: Permission[];
  level: number;
  isActive: boolean;
  isSystemRole: boolean;
}

export interface UpdateRoleForm extends CreateRoleForm {
  id: string;
}

// Tipos para la gestión de usuarios en tenants
export interface CreateUserTenantRoleForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  notes?: string;
}

// Utilidades para validación y manejo de roles
export const ROLE_LEVELS = {
  VIEWER: 10,
  EDITOR: 50,
  CONTENT_MANAGER: 70,
  TENANT_ADMIN: 90,
  SYSTEM_ADMIN: 100
} as const;

export const ROLE_COLORS = {
  system_admin: '#dc2626',    // Red
  tenant_admin: '#ea580c',    // Orange
  content_manager: '#d97706', // Amber
  editor: '#059669',          // Green
  viewer: '#6b7280'           // Gray
} as const;

export const ROLE_ICONS = {
  system_admin: '⚡',
  tenant_admin: '👑',
  content_manager: '📝',
  editor: '✏️',
  viewer: '👁️'
} as const;

// Funciones helper para manejo de roles
export const getRoleConfig = (slug: SystemRoleSlug) => ({
  name: SYSTEM_ROLES[slug],
  color: ROLE_COLORS[slug],
  icon: ROLE_ICONS[slug],
  level: ROLE_LEVELS[slug.toUpperCase() as keyof typeof ROLE_LEVELS] || 10
});

export const canManageRole = (userLevel: number, targetLevel: number): boolean => {
  return userLevel > targetLevel;
};

export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  return userRole.permissions.includes(permission);
};

export const getPermissionsByCategory = () => {
  const categories: Record<string, Permission[]> = {};
  
  Object.keys(PERMISSIONS).forEach(permission => {
    const [category] = permission.split('.');
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(permission as Permission);
  });
  
  return categories;
};

// Constantes para validación
export const VALIDATION_RULES = {
  ROLE_NAME_MIN_LENGTH: 3,
  ROLE_NAME_MAX_LENGTH: 50,
  ROLE_SLUG_MIN_LENGTH: 3,
  ROLE_SLUG_MAX_LENGTH: 30,
  DESCRIPTION_MAX_LENGTH: 255,
  MIN_ADMIN_LEVEL: 90
} as const;