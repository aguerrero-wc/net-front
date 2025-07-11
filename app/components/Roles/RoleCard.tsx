// components/Roles/RoleCard.tsx
import { useState } from "react";
import type { Role, PermissionObject } from "~/types/roles";
import { getPermissionsByCategory } from "~/types/roles";

interface RoleCardProps {
  roleId: string; // ✅ ID del rol
  role: Role;
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
  onToggleStatus: (roleId: string, isActive: boolean) => void;
}

export default function RoleCard({ 
  roleId, 
  role, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: RoleCardProps) {
  const [mostrarPermisos, setMostrarPermisos] = useState(false);

  const obtenerNivelColor = (level: number) => {
    if (level >= 90) return 'bg-red-100 text-red-800';
    if (level >= 70) return 'bg-orange-100 text-orange-800';
    if (level >= 50) return 'bg-yellow-100 text-yellow-800';
    if (level >= 30) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Agrupar permisos por categoría
  const gruposPermisos = getPermissionsByCategory(role.permissions);

  const handleEdit = () => {
    if (role.isSystemRole) {
      alert('No puedes editar roles del sistema');
      return;
    }
    onEdit(roleId);
  };

  const handleDelete = () => {
    if (role.isSystemRole) {
      alert('No puedes eliminar roles del sistema');
      return;
    }
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      onDelete(roleId);
    }
  };

  const handleToggleStatus = () => {
    if (role.isSystemRole && role.isActive) {
      alert('No puedes desactivar roles del sistema');
      return;
    }
    onToggleStatus(roleId, !role.isActive);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header del rol */}
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-medium text-gray-900">{role.name}</h4>
            
            <span 
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${obtenerNivelColor(role.level)}`}
            >
              Nivel {role.level}
            </span>
            
            <span 
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                role.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {role.isActive ? 'Activo' : 'Inactivo'}
            </span>
            
            {role.isSystemRole && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sistema
              </span>
            )}
          </div>
          
          {/* Descripción */}
          {role.description && (
            <p className="text-sm text-gray-600 mb-3">{role.description}</p>
          )}
          
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Slug: {role.slug}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{role.permissions.length} permisos</span>
            </div>
          </div>

          {/* Permisos expandibles */}
          <div className="mt-3">
            <button
              onClick={() => setMostrarPermisos(!mostrarPermisos)}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
            >
              {mostrarPermisos ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Ocultar permisos por categorías
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Ver permisos por categorías ({Object.keys(gruposPermisos).length} categorías)
                </>
              )}
            </button>
            
            {mostrarPermisos && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                {Object.keys(gruposPermisos).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(gruposPermisos).map(([categoria, permisos]) => (
                      <div key={categoria} className="border-l-2 border-purple-200 pl-3">
                        <h5 className="font-medium text-gray-900 text-sm mb-2 capitalize flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          {categoria}
                          <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border">
                            {permisos.length}
                          </span>
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                          {permisos.map(permiso => (
                            <span 
                              key={permiso.id} 
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800 border border-green-200"
                              title={`${permiso.group}: ${permiso.key}`}
                            >
                              {permiso.description}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    No hay permisos asignados
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Acciones */}
        <div className="flex items-center gap-2 ml-4">
          {/* Toggle activo/inactivo */}
          <button
            onClick={handleToggleStatus}
            disabled={role.isSystemRole && role.isActive}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              role.isActive 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {role.isActive ? 'Desactivar' : 'Activar'}
          </button>

          {/* Editar */}
          <button
            onClick={handleEdit}
            disabled={role.isSystemRole}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            title={`Editar rol ${roleId}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          {/* Eliminar */}
          <button
            onClick={handleDelete}
            disabled={role.isSystemRole}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            title={`Eliminar rol ${roleId}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}