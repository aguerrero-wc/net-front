// app/components/Clients/ClientForm/ServicesSection.tsx
import { SectionCard } from "../shared/SectionCard";
import { useServices } from "../hooks/useServices";

interface ServicesSectionProps {
  initialServices?: any[];
}

// Configuración de campos por tipo de servicio
const SERVICE_CONFIGS = {
  "AWS S3": [
    { name: "accessKeyId", label: "Access Key ID", type: "text", required: true },
    { name: "secretAccessKey", label: "Secret Access Key", type: "password", required: true },
    { name: "bucket", label: "Bucket Name", type: "text", required: true },
    { name: "region", label: "Region", type: "text", required: true, placeholder: "us-east-1" }
  ],
  "Digital Ocean Spaces": [
    { name: "accessKeyId", label: "Access Key ID", type: "text", required: true },
    { name: "secretAccessKey", label: "Secret Access Key", type: "password", required: true },
    { name: "endpoint", label: "Endpoint", type: "text", required: true, placeholder: "nyc3.digitaloceanspaces.com" },
    { name: "bucket", label: "Space Name", type: "text", required: true }
  ],
  "SMTP2GO": [
    { name: "apiKey", label: "API Key", type: "password", required: true },
    { name: "fromEmail", label: "From Email", type: "email", required: true },
    { name: "fromName", label: "From Name", type: "text", required: false }
  ],
  "SendGrid": [
    { name: "apiKey", label: "API Key", type: "password", required: true },
    { name: "fromEmail", label: "From Email", type: "email", required: true }
  ],
  "Meta (Facebook/Instagram)": [
    { name: "appId", label: "App ID", type: "text", required: true },
    { name: "appSecret", label: "App Secret", type: "password", required: true },
    { name: "accessToken", label: "Access Token", type: "password", required: true }
  ],
  "Stripe": [
    { name: "publicKey", label: "Publishable Key", type: "text", required: true },
    { name: "secretKey", label: "Secret Key", type: "password", required: true },
    { name: "webhookSecret", label: "Webhook Secret", type: "password", required: false }
  ],
  "Vimeo": [
    { name: "clientId", label: "Client ID", type: "text", required: true },
    { name: "clientSecret", label: "Client Secret", type: "password", required: true },
    { name: "accessToken", label: "Access Token", type: "password", required: true }
  ],
  "YouTube API": [
    { name: "apiKey", label: "API Key", type: "password", required: true },
    { name: "clientId", label: "Client ID", type: "text", required: false }
  ]
};

const TIPOS_SERVICIO = Object.keys(SERVICE_CONFIGS);

export function ServicesSection({ initialServices = [] }: ServicesSectionProps) {
  const {
    servicios,
    nuevoServicio,
    setNuevoServicio,
    mostrarFormulario,
    setMostrarFormulario,
    agregarServicio,
    eliminarServicio,
    toggleServicioActivo,
    cancelarFormulario
  } = useServices(initialServices);

  // Obtener configuración de campos del servicio seleccionado
  const camposActuales = nuevoServicio.serviceType 
    ? SERVICE_CONFIGS[nuevoServicio.serviceType as keyof typeof SERVICE_CONFIGS] || []
    : [];

  // Handler para cambios en credenciales
  const handleCredentialChange = (fieldName: string, value: string) => {
    setNuevoServicio(prev => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [fieldName]: value
      }
    }));
  };

  // Validar que todos los campos requeridos estén llenos
  const isFormValid = () => {
    if (!nuevoServicio.serviceType) return false;
    
    const requiredFields = camposActuales.filter(campo => campo.required);
    return requiredFields.every(campo => 
      nuevoServicio.credentials?.[campo.name]?.trim()
    );
  };

  return (
    <SectionCard
      title="Servicios Externos"
      colorScheme="amber"
      icon={
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      }
      action={
        <button
          type="button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Servicio
        </button>
      }
    >
      {/* Formulario para nuevo servicio */}
      {mostrarFormulario && (
        <div className="backdrop-blur-sm bg-amber-50/60 border border-amber-200/50 rounded-2xl p-6 mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Integración
          </h3>

          <div className="space-y-4">
            {/* Selector de tipo de servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Servicio <span className="text-[#E6600D]">*</span>
              </label>
              <select
                value={nuevoServicio.serviceType}
                onChange={(e) => {
                  setNuevoServicio(prev => ({ 
                    ...prev, 
                    serviceType: e.target.value,
                    credentials: {} // Reset credentials cuando cambia el tipo
                  }));
                }}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
              >
                <option value="">Seleccionar servicio</option>
                {TIPOS_SERVICIO.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Campos dinámicos según el tipo de servicio */}
            {nuevoServicio.serviceType && camposActuales.length > 0 && (
              <div className="border-t border-amber-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Credenciales de {nuevoServicio.serviceType}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {camposActuales.map((campo) => (
                    <div key={campo.name} className={campo.name.includes('token') || campo.name.includes('secret') ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {campo.label} {campo.required && <span className="text-[#E6600D]">*</span>}
                      </label>
                      <input
                        type={campo.type}
                        value={nuevoServicio.credentials?.[campo.name] || ''}
                        onChange={(e) => handleCredentialChange(campo.name, e.target.value)}
                        placeholder={campo.placeholder || `Ingresa ${campo.label.toLowerCase()}`}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estado activo */}
            <div className="border-t border-amber-200 pt-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nuevoServicio.isActive}
                  onChange={(e) => setNuevoServicio(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                Servicio Activo
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={agregarServicio}
              disabled={!isFormValid()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Agregar Servicio
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

      {/* Lista de servicios */}
      {servicios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{servicio.serviceType}</h4>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      servicio.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {servicio.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  <button
                    type="button"
                    onClick={() => toggleServicioActivo(servicio.id)}
                    className={`p-2 transition-colors rounded-xl ${
                      servicio.isActive
                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    title={servicio.isActive ? "Desactivar" : "Activar"}
                  >
                    {servicio.isActive ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => eliminarServicio(servicio.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                    title="Eliminar servicio"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mostrar credenciales (ocultas) */}
              <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-medium">Credenciales configuradas:</span>
                </div>
                <div className="pl-6 space-y-1 text-xs text-gray-500">
                  {Object.keys(servicio.credentials || {}).map(key => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">••••••••</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No hay servicios configurados</p>
          <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Servicio" para empezar</p>
        </div>
      )}

      {/* Hidden input para enviar servicios al action */}
      <input 
        type="hidden" 
        name="servicios" 
        value={JSON.stringify(servicios)} 
      />
    </SectionCard>
  );
}