// components/Clients/ControlCenterCard.tsx
import { useState } from "react";
import type { Cliente, Usuario } from "~/types/cliente";

interface ControlCenterCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ControlCenterCard({ cliente, isEditing }: ControlCenterCardProps) {
  // Estados para manejar los usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>(
    isEditing ? (cliente.usuarios || [
      {
        id: 1,
        nombre: "Carlos Admin",
        email: "admin@clinicadelcountry.com",
        usuario: "cadmin",
        rol: "admin",
        estado: "activo",
        fechaCreacion: "2024-01-15",
        ultimoAcceso: "2024-06-15",
        permisos: {
          contenidos: true,
          comunicados: true,
          usuarios: true,
          configuracion: true,
          reportes: true
        },
        requiereCambioContrasena: false,
        fechaUltimoCambioContrasena: "2024-03-15"
      }
    ]) : []
  );

  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, 'id' | 'fechaCreacion' | 'ultimoAcceso'>>({
    nombre: "",
    email: "",
    usuario: "",
    rol: "viewer",
    estado: "activo",
    permisos: {
      contenidos: false,
      comunicados: false,
      usuarios: false,
      configuracion: false,
      reportes: false
    },
    requiereCambioContrasena: true
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<number | null>(null);
  const [mostrarRestablecerContrasena, setMostrarRestablecerContrasena] = useState<number | null>(null);

  const roles = [
    { 
      value: 'admin', 
      label: 'Administrador',
      description: 'Acceso completo al sistema',
      permisos: { contenidos: true, comunicados: true, usuarios: true, configuracion: true, reportes: true }
    },
    { 
      value: 'editor', 
      label: 'Editor',
      description: 'Puede gestionar contenidos y comunicados',
      permisos: { contenidos: true, comunicados: true, usuarios: false, configuracion: false, reportes: true }
    },
    { 
      value: 'moderator', 
      label: 'Moderador',
      description: 'Puede revisar y aprobar contenidos',
      permisos: { contenidos: true, comunicados: false, usuarios: false, configuracion: false, reportes: false }
    },
    { 
      value: 'viewer', 
      label: 'Visualizador',
      description: 'Solo puede ver reportes',
      permisos: { contenidos: false, comunicados: false, usuarios: false, configuracion: false, reportes: true }
    }
  ];

  const estados = [
    { value: 'activo', label: 'Activo', color: 'bg-green-100 text-green-800' },
    { value: 'inactivo', label: 'Inactivo', color: 'bg-gray-100 text-gray-800' },
    { value: 'suspendido', label: 'Suspendido', color: 'bg-red-100 text-red-800' }
  ];

  // Función para agregar nuevo usuario
  const agregarUsuario = () => {
    if (nuevoUsuario.nombre.trim() && nuevoUsuario.email.trim() && nuevoUsuario.usuario.trim()) {
      // Verificar que el usuario no exista
      const usuarioExiste = usuarios.some(u => u.usuario === nuevoUsuario.usuario || u.email === nuevoUsuario.email);
      if (usuarioExiste) {
        alert("Ya existe un usuario con ese email o nombre de usuario");
        return;
      }

      const usuarioConId: Usuario = {
        ...nuevoUsuario,
        id: Date.now(),
        fechaCreacion: new Date().toISOString().split('T')[0],
        requiereCambioContrasena: true
      };

      setUsuarios(prev => [...prev, usuarioConId]);
      setNuevoUsuario({
        nombre: "",
        email: "",
        usuario: "",
        rol: "viewer",
        estado: "activo",
        permisos: {
          contenidos: false,
          comunicados: false,
          usuarios: false,
          configuracion: false,
          reportes: false
        },
        requiereCambioContrasena: true
      });
      setMostrarFormulario(false);
    }
  };

  // Función para eliminar usuario
  const eliminarUsuario = (id: number) => {
    if (usuarios.length === 1) {
      alert("No puedes eliminar el último usuario del sistema");
      return;
    }
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  // Función para cambiar estado del usuario
  const cambiarEstadoUsuario = (id: number, nuevoEstado: Usuario['estado']) => {
    setUsuarios(prev => prev.map(u => 
      u.id === id ? { ...u, estado: nuevoEstado } : u
    ));
  };

  // Función para manejar cambio de rol
  const cambiarRolUsuario = (rol: Usuario['rol']) => {
    const rolSeleccionado = roles.find(r => r.value === rol);
    if (rolSeleccionado) {
      setNuevoUsuario(prev => ({
        ...prev,
        rol: rol as Usuario['rol'],
        permisos: { ...rolSeleccionado.permisos }
      }));
    }
  };

  // Función para restablecer contraseña
  const restablecerContrasena = (id: number) => {
    setUsuarios(prev => prev.map(u => 
      u.id === id ? { 
        ...u, 
        requiereCambioContrasena: true,
        fechaUltimoCambioContrasena: new Date().toISOString().split('T')[0]
      } : u
    ));
    setMostrarRestablecerContrasena(null);
    // Aquí enviarías el email de restablecimiento
    alert("Se ha enviado un email para restablecer la contraseña");
  };

  const formatearFecha = (fecha?: string) => {
    if (!fecha) return "Nunca";
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const obtenerRolInfo = (rol: Usuario['rol']) => {
    return roles.find(r => r.value === rol) || roles[3];
  };

  const obtenerEstadoInfo = (estado: Usuario['estado']) => {
    return estados.find(e => e.value === estado) || estados[1];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-800">Centro de Control</h2>
            <p className="text-sm text-purple-600 mt-1">Gestión de usuarios y accesos al sistema</p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Usuario
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Formulario para nuevo usuario */}
        {mostrarFormulario && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Nuevo Usuario del Sistema</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Nombre completo del usuario"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.usuario}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, usuario: e.target.value.toLowerCase() }))}
                  placeholder="nombreusuario"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">Solo letras minúsculas y números</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={nuevoUsuario.rol}
                  onChange={(e) => cambiarRolUsuario(e.target.value as Usuario['rol'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {roles.map(rol => (
                    <option key={rol.value} value={rol.value}>{rol.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {obtenerRolInfo(nuevoUsuario.rol).description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={nuevoUsuario.estado}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, estado: e.target.value as Usuario['estado'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {estados.map(estado => (
                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Permisos específicos */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Permisos Específicos</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(nuevoUsuario.permisos).map(([permiso, valor]) => (
                  <label key={permiso} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={valor}
                      onChange={(e) => setNuevoUsuario(prev => ({
                        ...prev,
                        permisos: { ...prev.permisos, [permiso]: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="capitalize">{permiso}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={agregarUsuario}
                disabled={!nuevoUsuario.nombre.trim() || !nuevoUsuario.email.trim() || !nuevoUsuario.usuario.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Crear Usuario
              </button>
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>

            {/* Aviso de seguridad */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Seguridad</p>
                  <p className="text-sm text-blue-700">Se enviará un email al usuario con instrucciones para establecer su contraseña.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de usuarios existentes */}
        {usuarios.length > 0 ? (
          <div className="space-y-4">
            {usuarios.map((usuario) => {
              const rolInfo = obtenerRolInfo(usuario.rol);
              const estadoInfo = obtenerEstadoInfo(usuario.estado);
              
              return (
                <div key={usuario.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{usuario.nombre}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${estadoInfo.color}`}>
                          {estadoInfo.label}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {rolInfo.label}
                        </span>
                        {usuario.requiereCambioContrasena && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Requiere cambio de contraseña
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{usuario.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>@{usuario.usuario}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-7-7h14l-1 9H6l-1-9z" />
                          </svg>
                          <span>Creado: {formatearFecha(usuario.fechaCreacion)}</span>
                        </div>
                        
                        {usuario.ultimoAcceso && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Último acceso: {formatearFecha(usuario.ultimoAcceso)}</span>
                          </div>
                        )}

                        {/* Permisos */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Permisos:</span>
                          </div>
                          <div className="flex flex-wrap gap-1 ml-6">
                            {Object.entries(usuario.permisos).map(([permiso, valor]) => valor && (
                              <span key={permiso} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                {permiso}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {/* Cambiar estado */}
                      <select
                        value={usuario.estado}
                        onChange={(e) => cambiarEstadoUsuario(usuario.id, e.target.value as Usuario['estado'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        {estados.map(estado => (
                          <option key={estado.value} value={estado.value}>{estado.label}</option>
                        ))}
                      </select>

                      {/* Restablecer contraseña */}
                      <button
                        type="button"
                        onClick={() => setMostrarRestablecerContrasena(usuario.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Restablecer contraseña"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </button>
                      
                      {/* Eliminar usuario */}
                      <button
                        type="button"
                        onClick={() => eliminarUsuario(usuario.id)}
                        disabled={usuarios.length === 1}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        title="Eliminar usuario"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Modal de confirmación para restablecer contraseña */}
                  {mostrarRestablecerContrasena === usuario.id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Restablecer Contraseña</h3>
                        <p className="text-sm text-gray-600 mb-6">
                          Se enviará un email a <strong>{usuario.email}</strong> con instrucciones para restablecer la contraseña.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => restablecerContrasena(usuario.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Enviar Email
                          </button>
                          <button
                            onClick={() => setMostrarRestablecerContrasena(null)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="text-sm">No hay usuarios configurados</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic en "Agregar Usuario" para empezar</p>
          </div>
        )}

        {/* Hidden inputs para el formulario */}
        {usuarios.map((usuario, index) => (
          <div key={usuario.id}>
            <input type="hidden" name={`usuarios[${index}][id]`} value={usuario.id} />
            <input type="hidden" name={`usuarios[${index}][nombre]`} value={usuario.nombre} />
            <input type="hidden" name={`usuarios[${index}][email]`} value={usuario.email} />
            <input type="hidden" name={`usuarios[${index}][usuario]`} value={usuario.usuario} />
            <input type="hidden" name={`usuarios[${index}][rol]`} value={usuario.rol} />
            <input type="hidden" name={`usuarios[${index}][estado]`} value={usuario.estado} />
            <input type="hidden" name={`usuarios[${index}][permisos]`} value={JSON.stringify(usuario.permisos)} />
            <input type="hidden" name={`usuarios[${index}][requiereCambioContrasena]`} value={usuario.requiereCambioContrasena.toString()} />
          </div>
        ))}


      </div>
    </div>
  );
}