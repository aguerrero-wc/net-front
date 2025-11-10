// app/components/Clients/ClientForm/ContactsSection.tsx
import { SectionCard } from "../shared/SectionCard";
import { useContacts } from "../hooks/useContacts";

interface ContactsSectionProps {
  initialContacts?: any[];
}

const DEPARTAMENTOS = [
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

export function ContactsSection({ initialContacts = [] }: ContactsSectionProps) {
  const {
    contactos,
    nuevoContacto,
    setNuevoContacto,
    mostrarFormulario,
    setMostrarFormulario,
    agregarContacto,
    eliminarContacto,
    marcarComoPrincipal,
    cancelarFormulario
  } = useContacts(initialContacts);

  return (
    <SectionCard
      title="Contactos del Cliente"
      colorScheme="green"
      icon={
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      }
      action={
        <button
          type="button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Contacto
        </button>
      }
    >
      {/* Formulario para nuevo contacto */}
      {mostrarFormulario && (
        <div className="backdrop-blur-sm bg-emerald-50/60 border border-emerald-200/50 rounded-2xl p-6 mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Nuevo Contacto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span className="text-[#E6600D]">*</span>
              </label>
              <input
                type="text"
                value={nuevoContacto.nombre}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Nombre completo"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
              <input
                type="text"
                value={nuevoContacto.cargo}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, cargo: e.target.value }))}
                placeholder="Cargo o posición"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-[#E6600D]">*</span>
              </label>
              <input
                type="email"
                value={nuevoContacto.email}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@ejemplo.com"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={nuevoContacto.telefono}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, telefono: e.target.value }))}
                placeholder="Número de teléfono"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <select
                value={nuevoContacto.departamento}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, departamento: e.target.value }))}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
              >
                <option value="">Seleccionar departamento</option>
                {DEPARTAMENTOS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nuevoContacto.esContactoPrincipal}
                  onChange={(e) => setNuevoContacto(prev => ({ ...prev, esContactoPrincipal: e.target.checked }))}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
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
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Guardar Contacto
            </button>
            <button
              type="button"
              onClick={cancelarFormulario}
              className="px-5 py-2.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 text-gray-700 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95 text-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de contactos */}
      {contactos.length > 0 ? (
        <div className="space-y-4">
          {contactos.map((contacto) => (
            <div key={contacto.id} className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {contacto.nombre.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{contacto.nombre}</h4>
                      {contacto.esContactoPrincipal && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 border border-emerald-500/20">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Principal
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                    {contacto.cargo && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8 0V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                        </svg>
                        <span>{contacto.cargo}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{contacto.email}</span>
                    </div>

                    {contacto.telefono && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{contacto.telefono}</span>
                      </div>
                    )}

                    {contacto.departamento && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-xl hover:bg-emerald-50"
                      title="Marcar como principal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => eliminarContacto(contacto.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                    title="Eliminar contacto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No hay contactos agregados</p>
          <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Contacto" para empezar</p>
        </div>
      )}

      {/* Hidden input para enviar contactos al action */}
      <input 
        type="hidden" 
        name="contactos" 
        value={JSON.stringify(contactos)} 
      />
    </SectionCard>
  );
}