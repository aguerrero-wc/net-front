// components/Roles/index.ts
export { default as RolesManagementCard } from './RolesManagementCard';
export { default as RolesList } from './RolesList';
export { default as RoleCard } from './RoleCard';
export { default as RoleForm } from './RoleForm';

// Tipos relacionados con roles (si es necesario re-exportar)
export type {
  Role,
  Permission,
  SystemRoleSlug,
} from '~/types/roles';