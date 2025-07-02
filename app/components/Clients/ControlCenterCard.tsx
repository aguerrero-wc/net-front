// components/Clients/ControlCenterCard.tsx
import { useState } from "react";
import type { Cliente } from "~/types/client";
import type { User, UserTenantRole, Role, SystemRoleSlug } from "~/types/roles";
import { SYSTEM_ROLES } from "~/types/roles";

interface ControlCenterCardProps {
  cliente: Cliente;
  isEditing: boolean;
  availableRoles?: Role[];
  currentUserRole?: SystemRoleSlug;
}

export default function ControlCenterCard({ 
  cliente, 
  isEditing, 
  availableRoles = [],
  currentUserRole = 'viewer' 
}: ControlCenterCardProps) {
  // Estados para manejar los usuarios del tenant
  const [usuariosTenant, setUsuariosTenant] = useState<UserTenantRole[]>(
    isEditing ? [] : [] // Se cargarán desde el backend
  );

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<string | null>(null);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roleId: "",
    isActive: true,
    startsAt: "",
    expiresAt: "",
    notes: ""
  });

  // Roles disponibles para este tenant (filtrados por nivel de acceso)
  const rolesDisponibles = availableRoles.filter(role => {
    if (currentUserRole === 'system_admin') return true;
    if (currentUserRole === 'tenant_admin') return role.level < 100;
    return false; // Otros roles no pueden gestionar usuarios
  });

  // Verificar permisos
  const puedeGestionarUsuarios = ['system_admin', 'tenant_admin'].includes(currentUserRole);

  if (!puedeGestionarUsuarios) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
          <h2 className="text-lg font-semibold text-purple-800">Centro de Control</h2>
          <p className="text-sm text-purple-600 mt-1">Información del sistema</p>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm">No tienes permisos para gestionar usuarios</p>
            <p className="text-xs text-gray-400 mt-1">Contacta al administrador para más información</p>
          </div>
        </div>
      </div>
    );
  }

  // Función para agregar nuevo usuario
  const agregarUsuario = async () => {
    if (!nuevoUsuario.firstName.trim() || !nuevoUsuario.email.trim() || !nuevoUsuario.roleId) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Verificar que el email no exista
    const emailExiste = usuariosTenant.some(u => u.user?.email === nuevoUsuario.email);
    if (emailExiste) {
      alert("Ya existe un usuario con ese email");
      return;
    }

    // En producción, aquí harías la llamada al backend
    // const response = await fetch('/api/tenants/${tenantId}/users', { method: 'POST', ... });
    
    console.log("Creando usuario:", nuevoUsuario);
    alert("Usuario creado. Se enviará un email de bienvenida.");
    
    resetFormulario();
  };

  const resetFormulario = () => {
    setNuevoUsuario({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      roleId: "",
      isActive: true,
      startsAt: "",
      expiresAt: "",
      notes: ""
    });
    setMostrarFormulario(false);
    setUsuarioEditando(null);
  };

  const cambiarRolUsuario = (userTenantRoleId: string, nuevoRoleId: string) => {
    // En producción: await fetch('/api/user-tenant-roles/${userTenantRoleId}', { method: 'PUT', ... });
    console.log("Cambiando rol:", { userTenantRoleId, nuevoRoleId });
  };

  const cambiarEstadoUsuario = (userTenantRoleId: string, activo: boolean) => {
    // En producción: await fetch('/api/user-tenant-roles/${userTenantRoleId}', { method: 'PUT', ... });
    console.log("Cambiando estado:", { userTenantRoleId, activo });
  };

  const restablecerContrasena = (userId: string) => {
    // En producción: await fetch('/api/users/${userId}/reset-password', { method: 'POST' });
    console.log("Restableciendo contraseña para usuario:", userId);
    alert("Se ha enviado un email para restablecer la contraseña");
  };

  const revocarAcceso = (userTenantRoleId: string) => {
    if (confirm('¿Estás seguro de revocar el acceso de este usuario?')) {
      // En producción: await fetch('/api/user-tenant-roles/${userTenantRoleId}', { method: 'DELETE' });
      console.log("Revocando acceso:", userTenantRoleId);
    }
  };

  const formatearFecha = (fecha?: string) => {
    if (!fecha) return "No definido";
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const obtenerRol = (roleId: string) => {
    return rolesDisponibles.find(r => r.id === roleId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-800">Centro de Control</h2>
            <p className="text-sm text-purple-600 mt-1">Gestión de usuarios y accesos del cliente</p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Invitar Usuario
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Formulario para invitar nuevo usuario */}
        {mostrarFormulario && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Invitar Nuevo Usuario</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.firstName}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.lastName}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Apellido"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@ejemplo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={nuevoUsuario.phone}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+57 300 123 4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol <span className="text-red-500">*</span>
                </label>
                <select
                  value={nuevoUsuario.roleId}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, roleId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Seleccionar rol</option>
                  {rolesDisponibles.map(rol => (
                    <option key={rol.id} value={rol.id}>
                      {rol.icon} {rol.name} (Nivel {rol.level})
                    </option>
                  ))}
                </select>
                {nuevoUsuario.roleId && (
                  <p className="text-xs text-gray-500 mt-1">
                    {obtenerRol(nuevoUsuario.roleId)?.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={nuevoUsuario.isActive.toString()}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio (opcional)</label>
                <input
                  type="date"
                  value={nuevoUsuario.startsAt}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, startsAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración (opcional)</label>
                <input
                  type="date"
                  value={nuevoUsuario.expiresAt}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
              <textarea
                value={nuevoUsuario.notes}
                onChange={(e) => setNuevoUsuario(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Notas sobre la asignación del rol..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={agregarUsuario}
                disabled={!nuevoUsuario.firstName.trim() || !nuevoUsuario.email.trim() || !nuevoUsuario.roleId}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Enviar Invitación
              </button>
              <button
                type="button"
                onClick={resetFormulario}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>

            {/* Aviso de seguridad */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Invitación por Email</p>
                  <p className="text-sm text-blue-700">Se enviará una invitación al email especificado con instrucciones para crear su cuenta.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de usuarios del tenant */}
        {usuariosTenant.length > 0 ? (
          <div className="space-y-4">
            {usuariosTenant.map((userTenantRole) => {
              const user = userTenantRole.user;
              const rol = userTenantRole.role;
              
              return (
                <div key={userTenantRole.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900">{user?.fullName}</h4>
                        
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${rol?.color}20`, 
                            color: rol?.color 
                          }}
                        >
                          {rol?.icon} {rol?.name}
                        </span>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          userTenantRole.isCurrentlyActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {userTenantRole.isCurrentlyActive ? 'Activo' : 'Inactivo'}
                        </span>

                        {userTenantRole.isExpired && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Expirado
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{user?.email}</span>
                        </div>
                        
                        {user?.phone && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{user.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-7-7h14l-1 9H6l-1-9z" />
                          </svg>
                          <span>Asignado: {formatearFecha(userTenantRole.createdAt)}</span>
                        </div>

                        {userTenantRole.expiresAt && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Expira: {formatearFecha(userTenantRole.expiresAt)}</span>
                          </div>
                        )}

                        {user?.lastLoginAt && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Último acceso: {formatearFecha(user.lastLoginAt)}</span>
                          </div>
                        )}

                        {userTenantRole.notes && (
                          <div className="md:col-span-2 lg:col-span-3">
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-gray-600 text-sm">{userTenantRole.notes}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {/* Cambiar rol */}
                      <select
                        value={userTenantRole.roleId}
                        onChange={(e) => cambiarRolUsuario(userTenantRole.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        {rolesDisponibles.map(rol => (
                          <option key={rol.id} value={rol.id}>{rol.name}</option>
                        ))}
                      </select>

                      {/* Cambiar estado */}
                      <button
                        onClick={() => cambiarEstadoUsuario(userTenantRole.id, !userTenantRole.isActive)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          userTenantRole.isActive 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {userTenantRole.isActive ? 'Desactivar' : 'Activar'}
                      </button>

                      {/* Restablecer contraseña */}
                      <button
                        onClick={() => restablecerContrasena(user?.id || '')}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Restablecer contraseña"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </button>
                      
                      {/* Revocar acceso */}
                      <button
                        onClick={() => revocarAcceso(userTenantRole.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Revocar acceso"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="text-sm">No hay usuarios asignados a este cliente</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic en "Invitar Usuario" para empezar</p>
          </div>
        )}

        {/* Configuraciones generales del sistema */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-base font-medium text-gray-900 mb-4">Configuraciones del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Gestión Cliente
              </label>
              <input
                type="email"
                name="correoGestionCliente"
                defaultValue={cliente.correoGestionCliente}
                placeholder="gestion@ejemplo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Tek Team
              </label>
              <textarea
                name="correoTekTeam"
                defaultValue={cliente.correoTekTeam}
                placeholder="team1@ejemplo.com, team2@ejemplo.com"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}