// app/components/Clients/ClientForm/index.tsx
import { Link, useParams } from "@remix-run/react";
import { BasicInfoSection } from "./BasicInfoSection";
import { NotificationsSection } from "./NotificationsSection";
// import { ThemeSection } from "./ThemeSection";
// import { ContactsSection } from "./ContactsSection";
// import { ServicesSection } from "./ServicesSection";

export default function ClientForm() {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div className="flex-1 bg-gradient-to-br from-orange-50 via-sky-50 to-emerald-50 min-h-screen relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6600D] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Header con glassmorphism */}
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/50 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#E6600D] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
              <span className="text-gray-400">›</span>
              <Link to="/dashboard/clients" className="text-gray-600 hover:text-[#E6600D] transition-colors">
                Clientes
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">
                {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
              </span>
            </nav>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/clients"
                className="px-5 py-2.5 text-gray-700 backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all hover:scale-105 active:scale-95 font-medium"
              >
                Volver
              </Link>
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-semibold">
                {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto relative z-10">
        {/* Título */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing 
                ? 'Modifica la información del cliente' 
                : 'Ingresa los datos del nuevo cliente'
              }
            </p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Sección 1: Información Básica */}
          <BasicInfoSection />

          {/* Sección 2: Configuración de Tema (TODO) */}
          {/* <ThemeSection /> */}

          {/* Sección 3: Contactos (TODO) */}
          {/* <ContactsSection /> */}

          {/* Sección 4: Notificaciones */}
          <NotificationsSection
            initialReportes={isEditing ? ["tekteamcolombia@windowschannel.com"] : []}
            initialAlertas={isEditing ? ["alerta@ejemplo.com"] : []}
          />

          {/* Sección 5: Servicios Externos (TODO) */}
          {/* <ServicesSection /> */}

          {/* Botones de acción finales */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/dashboard/clients"
              className="px-8 py-3.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all hover:scale-105 active:scale-95 font-semibold"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-bold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? 'Guardar Cliente' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </div>

      {/* Animaciones CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}