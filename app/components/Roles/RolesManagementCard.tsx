import { useState, useEffect } from "react";
import { useActionData, useRevalidator } from "@remix-run/react";
import type { Role, PermissionObject, SystemRoleSlug } from "~/types/roles";
import RolesList from "./RolesList";
import RoleForm from "./RoleForm";
import Notification from "./Notification";

interface RolesManagementCardProps {
  currentUserRole: SystemRoleSlug;
  roles?: Role[];
  permissions?: PermissionObject[];
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
  
  console.log('📊 RolesManagementCard recibió:', {
    rolesCount: roles.length,
    permissionsCount: permissions.length,
    roles: roles.map(r => ({ id: r.id, name: r.name }))
  });

  // ✅ NUEVO: Escuchar respuesta del action y revalidator
  const actionData = useActionData<any>();
  const revalidator = useRevalidator();

  // Estados del formulario únicamente
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rolEditando, setRolEditando] = useState<string | null>(null);
  
  // Estados para notificaciones
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  // ✅ NUEVO: Revalidar datos cuando el action sea exitoso
  useEffect(() => {
    console.log('📢 ActionData cambió:', actionData);
    
    if (actionData?.success) {
      console.log('✅ Action exitoso:', actionData);
      
      // Recargar datos del loader
      console.log('🔄 Revalidando datos...');
      revalidator.revalidate();
      
      // Cerrar formulario
      console.log('📝 Cerrando formulario...');
      resetFormulario();
      
      // Mostrar notificación de éxito
      if (actionData.message) {
        console.log('🔔 Mostrando notificación de éxito');
        setNotification({
          show: true,
          message: actionData.message,
          type: 'success'
        });
      }
    }
    
    // Mostrar error si existe
    if (actionData?.success === false && actionData?.message) {
      console.log('❌ Action falló:', actionData.message);
      setNotification({
        show: true,
        message: actionData.message,
        type: 'error'
      });
    }
  }, [actionData, revalidator]);

  // ===== FUNCIONES DE MANEJO DE ROLES =====

  const handleEditRole = (roleId: string) => {
    console.log('Editando rol con ID:', roleId);
    const rol = roles.find(r => r.id === roleId);
    
    if (rol?.isSystemRole) {
      alert('No puedes editar roles del sistema');
      return;
    }
    
    setRolEditando(roleId);
    setMostrarFormulario(true);
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Eliminando rol con ID:', roleId);
    const rol = roles.find(r => r.id === roleId);
    
    if (rol?.isSystemRole) {
      alert('No puedes eliminar roles del sistema');
      return;
    }
    
    // TODO: Implementar delete con Remix Form
    console.log('Delete pendiente de implementar');
  };

  const handleToggleRoleStatus = (roleId: string, isActive: boolean) => {
    console.log('Cambiando estado del rol:', roleId, 'a:', isActive);
    const rol = roles.find(r => r.id === roleId);
    
    if (rol?.isSystemRole && !isActive) {
      alert('No puedes desactivar roles del sistema');
      return;
    }
    
    // TODO: Implementar toggle con Remix Form
    console.log('Toggle pendiente de implementar');
  };

  const resetFormulario = () => {
    setMostrarFormulario(false);
    setRolEditando(null);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const getRoleBeingEdited = (): Role | null => {
    return rolEditando ? roles.find(r => r.id === rolEditando) || null : null;
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
              Configuración de roles y permisos del sistema • Total: {roles.length} roles
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
        {/* Notificación dinámica */}
        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />

        {/* Formulario para crear/editar rol */}
        {mostrarFormulario && (
          <RoleForm
            role={getRoleBeingEdited()}
            availablePermissions={permissions}
            onCancel={resetFormulario}
            isEditing={!!rolEditando}
          />
        )}

        <RolesList
          roles={roles}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          onToggleStatus={handleToggleRoleStatus}
        />
      </div>
    </div>
  );
}