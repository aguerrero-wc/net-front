// components/Admin/RolesManagementCard.tsx
// import { DynamicIcon } from 'lucide-react/dynamic';
import { Camera } from 'lucide-react';

import { useState } from "react";
import { Form, useNavigation } from "@remix-run/react";
import type { Role, Permission, SystemRoleSlug } from "~/types/roles";
import { SYSTEM_ROLES, PERMISSIONS, getPermissionsByCategory } from "~/types/roles";

interface RolesManagementCardProps {
  currentUserRole: SystemRoleSlug;
  roles?: Role[];
}

export default function RolesManagementCard({ 
  currentUserRole, 
  roles = [] 
}: RolesManagementCardProps) {
    console.log('Props recibidas en RolesManagementCard:', typeof({  roles }));
    console.log('Props recibidas en RolesManagementCard:', {  roles });


  const navigation = useNavigation();
  const isCreating = navigation.formData?.get('_action') === 'create_role';

  // Solo visible para system_admin
  if (currentUserRole !== 'system_admin') {
    return null;
  }

  // Estados
  const [rolesState, setRolesState] = useState<Role[]>(roles.length > 0 ? roles : [
    {
      id: '1',
      name: 'Administrador del Sistema',
      slug: 'system_admin',
      description: 'Acceso completo a todo el sistema multi-tenant',
      color: '#dc2626',
      icon: '⚡',
      permissions: Object.keys(PERMISSIONS) as Permission[],
      level: 100,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2', 
      name: 'Administrador del Cliente',
      slug: 'tenant_admin',
      description: 'Gestión completa del cliente asignado',
      color: '#ea580c',
      icon: '👑',
      permissions: [
        'users.create', 'users.read', 'users.update', 'users.delete',
        'content.create', 'content.read', 'content.update', 'content.delete', 'content.publish',
        'announcements.create', 'announcements.read', 'announcements.update', 'announcements.delete', 'announcements.publish',
        'reports.read', 'reports.export',
        'settings.read', 'settings.update'
      ],
      level: 90,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Gestor de Contenidos', 
      slug: 'content_manager',
      description: 'Gestión avanzada de contenidos y comunicados',
      color: '#d97706',
      icon: '📝',
      permissions: [
        'users.read',
        'content.create', 'content.read', 'content.update', 'content.delete', 'content.publish',
        'announcements.create', 'announcements.read', 'announcements.update', 'announcements.delete', 'announcements.publish',
        'reports.read'
      ],
      level: 70,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Editor',
      slug: 'editor',
      description: 'Creación y edición de contenidos',
      color: '#059669',
      icon: '✏️',
      permissions: [
        'content.create', 'content.read', 'content.update', 'content.publish',
        'reports.read'
      ],
      level: 50,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Visualizador',
      slug: 'viewer',
      description: 'Solo visualización de contenidos y reportes',
      color: '#6b7280',
      icon: '👁️',
      permissions: [
        'content.read',
        'announcements.read', 
        'reports.read'
      ],
      level: 10,
      isActive: true,
      isSystemRole: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rolEditando, setRolEditando] = useState<string | null>(null);
  const [mostrarPermisos, setMostrarPermisos] = useState<string | null>(null);

  const [nuevoRol, setNuevoRol] = useState<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    slug: '',
    description: '',
    color: '#6366f1',
    icon: '🎭',
    permissions: [],
    level: 10,
    isActive: true,
    isSystemRole: false
  });

  // Función para crear/editar rol
  const guardarRol = () => {
    if (!nuevoRol.name.trim() || !nuevoRol.slug.trim()) return;

    if (rolEditando) {
      // Editar rol existente
      setRolesState(prev => prev.map(rol => 
        rol.id === rolEditando 
          ? { ...rol, ...nuevoRol, updatedAt: new Date().toISOString() }
          : rol
      ));
    } else {
      // Crear nuevo rol
      const rol: Role = {
        ...nuevoRol,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRolesState(prev => [...prev, rol]);
    }

    resetFormulario();
  };

  const resetFormulario = () => {
    setNuevoRol({
      name: '',
      slug: '',
      description: '',
      color: '#6366f1',
      icon: '🎭',
      permissions: [],
      level: 10,
      isActive: true,
      isSystemRole: false
    });
    setMostrarFormulario(false);
    setRolEditando(null);
  };

  const editarRol = (rol: Role) => {
    if (rol.isSystemRole) {
      alert('No puedes editar roles del sistema');
      return;
    }
    setNuevoRol({
      name: rol.name,
      slug: rol.slug,
      description: rol.description || '',
      color: rol.color || '#6366f1',
      icon: rol.icon || '🎭',
      permissions: rol.permissions,
      level: rol.level,
      isActive: rol.isActive,
      isSystemRole: rol.isSystemRole
    });
    setRolEditando(rol.id);
    setMostrarFormulario(true);
  };

  const eliminarRol = (id: string) => {
    const rol = rolesState.find(r => r.id === id);
    if (rol?.isSystemRole) {
      alert('No puedes eliminar roles del sistema');
      return;
    }
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      setRolesState(prev => prev.filter(r => r.id !== id));
    }
  };

  const togglePermiso = (permiso: Permission) => {
    setNuevoRol(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permiso)
        ? prev.permissions.filter(p => p !== permiso)
        : [...prev.permissions, permiso]
    }));
  };

  const cambiarEstadoRol = (id: string, activo: boolean) => {
    const rol = rolesState.find(r => r.id === id);
    if (rol?.isSystemRole && !activo) {
      alert('No puedes desactivar roles del sistema');
      return;
    }
    setRolesState(prev => prev.map(r => 
      r.id === id ? { ...r, isActive: activo, updatedAt: new Date().toISOString() } : r
    ));
  };

  const agruparPermisos = getPermissionsByCategory;

  const gruposPermisos = agruparPermisos();

  const obtenerNivelColor = (level: number) => {
    if (level >= 90) return 'bg-red-100 text-red-800';
    if (level >= 70) return 'bg-orange-100 text-orange-800';
    if (level >= 50) return 'bg-yellow-100 text-yellow-800';
    if (level >= 30) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
              🎭 Gestión de Roles
            </h2>
            <p className="text-sm text-purple-600 mt-1">
              Configuración de roles y permisos del sistema
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear Rol
          </button>
          <Camera color="red" size={48} />

        </div>
      </div>

      <div className="p-6">
        {/* Formulario para crear/editar rol */}
        {mostrarFormulario && (
          <Form method="post" className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              {rolEditando ? 'Editar Rol' : 'Crear Nuevo Rol'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Rol <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoRol.name}
                  onChange={(e) => setNuevoRol(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre descriptivo del rol"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoRol.slug}
                  onChange={(e) => setNuevoRol(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '_') }))}
                  placeholder="nombre_del_rol"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={nuevoRol.description}
                  onChange={(e) => setNuevoRol(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción del rol y sus responsabilidades"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={nuevoRol.color}
                      onChange={(e) => setNuevoRol(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={nuevoRol.color}
                      onChange={(e) => setNuevoRol(prev => ({ ...prev, color: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                  <input
                    type="text"
                    value={nuevoRol.icon}
                    onChange={(e) => setNuevoRol(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="🎭"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Acceso</label>
                <select
                  value={nuevoRol.level}
                  onChange={(e) => setNuevoRol(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={10}>Básico (10)</option>
                  <option value={30}>Intermedio (30)</option>
                  <option value={50}>Avanzado (50)</option>
                  <option value={70}>Gestor (70)</option>
                  <option value={90}>Administrador (90)</option>
                  <option value={100}>Sistema (100)</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={nuevoRol.isActive}
                    onChange={(e) => setNuevoRol(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  Rol Activo
                </label>
              </div>
            </div>

            {/* Permisos */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Permisos</label>
              <div className="space-y-4">
                {Object.entries(gruposPermisos).map(([categoria, permisos]) => (
                  <div key={categoria} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-2 capitalize">{categoria}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {permisos.map(permiso => (
                        <label key={permiso} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={nuevoRol.permissions.includes(permiso)}
                            onChange={() => togglePermiso(permiso)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{PERMISSIONS[permiso]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={guardarRol}
                disabled={!nuevoRol.name.trim() || !nuevoRol.slug.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {rolEditando ? 'Actualizar Rol' : 'Crear Rol'}
              </button>
              <button
                type="button"
                onClick={resetFormulario}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}

        {/* Lista de roles */}
        <div className="space-y-4">
          {rolesState.map((rol) => (
            <div key={rol.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{rol.icon}</span>
                    <h4 className="font-medium text-gray-900">{rol.name}</h4>
                    
                    <span 
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${obtenerNivelColor(rol.level)}`}
                    >
                      Nivel {rol.level}
                    </span>
                    
                    <span 
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        rol.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rol.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                    
                    {rol.isSystemRole && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Sistema
                      </span>
                    )}
                  </div>
                  
                  {rol.description && (
                    <p className="text-sm text-gray-600 mb-3">{rol.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>Slug: {rol.slug}</span>
                    </div>
{/*                     
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Creado: {formatearFecha(rol.createdAt)}</span>
                    </div>
                     */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{rol.permissions.length} permisos</span>
                    </div>
                  </div>

                  {/* Permisos expandibles */}
                  <div className="mt-3">
                    <button
                      onClick={() => setMostrarPermisos(mostrarPermisos === rol.id ? null : rol.id)}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      {mostrarPermisos === rol.id ? '▼ Ocultar permisos' : '▶ Ver permisos'}
                    </button>
                    
                    {mostrarPermisos === rol.id && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                          {rol.permissions.map(permiso => (
                            <span key={permiso} className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                              {PERMISSIONS[permiso as Permission]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {/* Toggle activo/inactivo */}
                  <button
                    onClick={() => cambiarEstadoRol(rol.id, !rol.isActive)}
                    disabled={rol.isSystemRole && !rol.isActive}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      rol.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {rol.isActive ? 'Desactivar' : 'Activar'}
                  </button>

                  {/* Editar */}
                  <button
                    onClick={() => editarRol(rol)}
                    disabled={rol.isSystemRole}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    title="Editar rol"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  {/* Eliminar */}
                  <button
                    onClick={() => eliminarRol(rol.id)}
                    disabled={rol.isSystemRole}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    title="Eliminar rol"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rolesState.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="text-sm">No hay roles configurados</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic en "Crear Rol" para empezar</p>
          </div>
        )}

        {/* Hidden inputs para el formulario */}
        {rolesState.map((rol, index) => (
          <div key={rol.id}>
            <input type="hidden" name={`roles[${index}][id]`} value={rol.id} />
            <input type="hidden" name={`roles[${index}][name]`} value={rol.name} />
            <input type="hidden" name={`roles[${index}][slug]`} value={rol.slug} />
            <input type="hidden" name={`roles[${index}][description]`} value={rol.description || ''} />
            <input type="hidden" name={`roles[${index}][color]`} value={rol.color || ''} />
            <input type="hidden" name={`roles[${index}][icon]`} value={rol.icon || ''} />
            <input type="hidden" name={`roles[${index}][permissions]`} value={JSON.stringify(rol.permissions)} />
            <input type="hidden" name={`roles[${index}][level]`} value={rol.level} />
            <input type="hidden" name={`roles[${index}][isActive]`} value={rol.isActive.toString()} />
            <input type="hidden" name={`roles[${index}][isSystemRole]`} value={rol.isSystemRole.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
}