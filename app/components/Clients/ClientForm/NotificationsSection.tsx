// app/components/Clients/ClientForm/NotificationsSection.tsx
import { SectionCard } from "../shared/SectionCard";
import { EmailListManager } from "../shared/EmailListManager";
import { useNotifications } from "../hooks/useNotifications";

interface NotificationsSectionProps {
  initialReportes?: string[];
  initialAlertas?: string[];
}

export function NotificationsSection({
  initialReportes = [],
  initialAlertas = []
}: NotificationsSectionProps) {
  const {
    emailsReportes,
    nuevoEmailReporte,
    setNuevoEmailReporte,
    agregarEmailReporte,
    eliminarEmailReporte,
    emailsAlertas,
    nuevoEmailAlerta,
    setNuevoEmailAlerta,
    agregarEmailAlerta,
    eliminarEmailAlerta
  } = useNotifications(initialReportes, initialAlertas);

  return (
    <SectionCard
      title="Configuración de Email"
      colorScheme="purple"
      icon={
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      }
    >
      {/* Configuración de Email Remitente */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Remitente de Emails</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Remitente</label>
            <input
              type="text"
              name="emailFromName"
              placeholder="Windows Channel"
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email del Remitente</label>
            <input
              type="email"
              name="emailFromAddress"
              placeholder="noreply@windowschannel.com"
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Destinatarios de Notificaciones */}
      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Reportes */}
          <EmailListManager
            title="Email Reportes"
            icon={
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            emails={emailsReportes}
            newEmail={nuevoEmailReporte}
            setNewEmail={setNuevoEmailReporte}
            onAdd={agregarEmailReporte}
            onRemove={eliminarEmailReporte}
            placeholder="reporte@ejemplo.com"
            colorScheme="blue"
          />

          {/* Email Alertas */}
          <EmailListManager
            title="Email Alertas"
            icon={
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
            emails={emailsAlertas}
            newEmail={nuevoEmailAlerta}
            setNewEmail={setNuevoEmailAlerta}
            onAdd={agregarEmailAlerta}
            onRemove={eliminarEmailAlerta}
            placeholder="alerta@ejemplo.com"
            colorScheme="red"
          />
        </div>
      </div>
    </SectionCard>
  );
}