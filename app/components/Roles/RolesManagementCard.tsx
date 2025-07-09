// components/Roles/RolesManagementCard.tsx - VERSIÓN REFACTORIZADA
import { useState } from "react";
import type { Role, PermissionObject, SystemRoleSlug } from "~/types/roles";
import RolesList from "./RolesList";
import RoleForm from "./RoleForm";

interface RolesManagementCardProps {
  currentUserRole: SystemRoleSlug;
  roles?: Role[];
  permissions?: PermissionObject[]; // ← Ahora tipado correctamente
}

export default function RolesManagementCard({ 
  currentUserRole, 
  roles = [],
  permissions = []
}: RolesManagementCardProps) {
  // Solo visible para system_admin
  if (currentUserRole !== 'system_admin') {
    return null;
  }

  // Estados principales
  const [rolesState, setRolesState] = useState<Role[]>(roles.length > 0 ? roles : [
    {
      id: '1',
      name: 'Administrador del Sistema',
      slug: 'system_admin',
      description: 'Acceso completo a todo el sistema multi-tenant',
      color: '#dc2626',
      icon: '⚡',
      permissions: [], // ← Vacío por ahora, se llenará con datos reales de la API
      level: 100,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
    // Datos de ejemplo simplificados - los reales vendrán de la API
  ]);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rolEditando, setRolEditando] = useState<string | null>(null);

  // ===== FUNCIONES DE MANEJO DE ROLES =====

  const handleEditRole = (roleId: string) => {
    console.log('Editando rol con ID:', roleId);
    const rol = rolesState.find(r => r.id === roleId);
    
    if (rol?.isSystemRole) {
      alert('No puedes editar roles del sistema');
      return;
    }
    
    setRolEditando(roleId);
    setMostrarFormulario(true);
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Eliminando rol con ID:', roleId);
    const rol = rolesState.find(r => r.id === roleId);
    
    if (rol?.isSystemRole) {
      alert('No puedes eliminar roles del sistema');
      return;
    }
    
    setRolesState(prev => prev.filter(r => r.id !== roleId));
  };

  const handleToggleRoleStatus = (roleId: string, isActive: boolean) => {
    console.log('Cambiando estado del rol:', roleId, 'a:', isActive);
    const rol = rolesState.find(r => r.id === roleId);
    
    if (rol?.isSystemRole && !isActive) {
      alert('No puedes desactivar roles del sistema');
      return;
    }
    
    setRolesState(prev => prev.map(r => 
      r.id === roleId 
        ? { ...r, isActive, updatedAt: new Date().toISOString() } 
        : r
    ));
  };

  const handleSaveRole = (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (rolEditando) {
      // Editar rol existente
      console.log('Actualizando rol:', rolEditando, roleData);
      setRolesState(prev => prev.map(rol => 
        rol.id === rolEditando 
          ? { ...rol, ...roleData, updatedAt: new Date().toISOString() }
          : rol
      ));
    } else {
      // Crear nuevo rol
      const nuevoRol: Role = {
        ...roleData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      console.log('Creando nuevo rol:', nuevoRol);
      setRolesState(prev => [...prev, nuevoRol]);
    }

    resetFormulario();
  };

  const resetFormulario = () => {
    setMostrarFormulario(false);
    setRolEditando(null);
  };

  const getRoleBeingEdited = (): Role | null => {
    return rolEditando ? rolesState.find(r => r.id === rolEditando) || null : null;
  };

  // ===== RENDER =====

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
              🛡️ Gestión de Roles
            </h2>
            <p className="text-sm text-purple-600 mt-1">
              Configuración de roles y permisos del sistema • Total: {rolesState.length} roles
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRolEditando(null);
              setMostrarFormulario(!mostrarFormulario);
            }}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {mostrarFormulario ? 'Cancelar' : 'Crear Rol'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Formulario para crear/editar rol */}
        {mostrarFormulario && (
          <RoleForm
            role={getRoleBeingEdited()}
            availablePermissions={permissions} // ← Pasando permisos disponibles
            onSave={handleSaveRole}
            onCancel={resetFormulario}
            isEditing={!!rolEditando}
          />
        )}

        <RolesList
          roles={rolesState}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          onToggleStatus={handleToggleRoleStatus}
        />

        
      </div>
    </div>
  );
}