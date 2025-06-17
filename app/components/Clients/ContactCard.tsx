// components/Clients/ContactCard.tsx
import { useState } from "react";
import type { Cliente, Contacto } from "~/types/cliente";

interface ContactCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ContactCard({ cliente, isEditing }: ContactCardProps) {
  // Estados para manejar los contactos
  const [contactos, setContactos] = useState<Contacto[]>(
    isEditing ? (cliente.contactos || [
      {
        id: 1,
        nombre: "Monica Jimeno",
        cargo: "Gerente de Marketing",
        telefono: "2145456",
        email: "mjimeno@clinicadelcountry.com",
        esContactoPrincipal: true,
        departamento: "Marketing"
      }
    ]) : []
  );

  const [nuevoContacto, setNuevoContacto] = useState<Omit<Contacto, 'id'>>({
    nombre: "",
    cargo: "",
    telefono: "",
    email: "",
    esContactoPrincipal: false,
    departamento: ""
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const departamentos = [
    "Gerencia General",
    "Marketing",
    "Comunicaciones", 
    "IT/Sistemas",
    "Administración",
    "Recursos Humanos",
    "Ventas",
    "Operaciones",
    "Otro"
  ];

  // Función para agregar nuevo contacto
  const agregarContacto = () => {
    if (nuevoContacto.nombre.trim() && nuevoContacto.email.trim()) {
      const contactoConId: Contacto = {
        ...nuevoContacto,
        id: Date.now(),
        // Si es el primer contacto, hacerlo principal automáticamente
        esContactoPrincipal: contactos.length === 0 ? true : nuevoContacto.esContactoPrincipal
      };

      // Si se marca como principal, quitar la marca de los demás
      if (contactoConId.esContactoPrincipal) {
        setContactos(prev => prev.map(c => ({ ...c, esContactoPrincipal: false })));
      }

      setContactos(prev => [...prev, contactoConId]);
      setNuevoContacto({
        nombre: "",
        cargo: "",
        telefono: "",
        email: "",
        esContactoPrincipal: false,
        departamento: ""
      });
      setMostrarFormulario(false);
    }
  };

  // Función para eliminar contacto
  const eliminarContacto = (id: number) => {
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  // Función para marcar como contacto principal
  const marcarComoPrincipal = (id: number) => {
    setContactos(prev => prev.map(c => ({
      ...c,
      esContactoPrincipal: c.id === id
    })));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-purple-800">Contactos</h2>
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Contacto
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Formulario para nuevo contacto */}
        {mostrarFormulario && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Nuevo Contacto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nuevoContacto.nombre}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  value={nuevoContacto.cargo}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, cargo: e.target.value }))}
                  placeholder="Cargo o posición"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={nuevoContacto.email}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@ejemplo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={nuevoContacto.telefono}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, telefono: e.target.value }))}
                  placeholder="Número de teléfono"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select
                  value={nuevoContacto.departamento}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, departamento: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Seleccionar departamento</option>
                  {departamentos.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={nuevoContacto.esContactoPrincipal}
                    onChange={(e) => setNuevoContacto(prev => ({ ...prev, esContactoPrincipal: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  Contacto Principal
                </label>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={agregarContacto}
                disabled={!nuevoContacto.nombre.trim() || !nuevoContacto.email.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Guardar Contacto
              </button>
              <button
                type="button"
                onClick={() => {
                  setMostrarFormulario(false);
                  setNuevoContacto({
                    nombre: "",
                    cargo: "",
                    telefono: "",
                    email: "",
                    esContactoPrincipal: false,
                    departamento: ""
                  });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de contactos existentes */}
        {contactos.length > 0 ? (
          <div className="space-y-4">
            {contactos.map((contacto) => (
              <div key={contacto.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{contacto.nombre}</h4>
                      {contacto.esContactoPrincipal && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Principal
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      {contacto.cargo && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8 0V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                          </svg>
                          <span>{contacto.cargo}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{contacto.email}</span>
                      </div>
                      
                      {contacto.telefono && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{contacto.telefono}</span>
                        </div>
                      )}
                      
                      {contacto.departamento && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
                          </svg>
                          <span>{contacto.departamento}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {!contacto.esContactoPrincipal && (
                      <button
                        type="button"
                        onClick={() => marcarComoPrincipal(contacto.id)}
                        className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                        title="Marcar como principal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => eliminarContacto(contacto.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Eliminar contacto"
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">No hay contactos agregados</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic en "Agregar Contacto" para empezar</p>
          </div>
        )}

        {/* Hidden inputs para el formulario */}
        {contactos.map((contacto, index) => (
          <div key={contacto.id}>
            <input type="hidden" name={`contactos[${index}][id]`} value={contacto.id} />
            <input type="hidden" name={`contactos[${index}][nombre]`} value={contacto.nombre} />
            <input type="hidden" name={`contactos[${index}][cargo]`} value={contacto.cargo} />
            <input type="hidden" name={`contactos[${index}][telefono]`} value={contacto.telefono} />
            <input type="hidden" name={`contactos[${index}][email]`} value={contacto.email} />
            <input type="hidden" name={`contactos[${index}][esContactoPrincipal]`} value={contacto.esContactoPrincipal.toString()} />
            <input type="hidden" name={`contactos[${index}][departamento]`} value={contacto.departamento} />
          </div>
        ))}
      </div>
    </div>
  );
}