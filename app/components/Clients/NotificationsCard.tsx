// components/Clients/NotificationsCard.tsx
import { useState } from "react";
import type { Cliente } from "~/types/cliente";

interface NotificationsCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function NotificationsCard({ cliente, isEditing }: NotificationsCardProps) {
  // Estados para manejar los destinatarios
  const [emailsNotificaciones, setEmailsNotificaciones] = useState<string[]>(
    isEditing ? ["tekteamcolombia@windowschannel.com"] : []
  );
  const [emailsAlertas, setEmailsAlertas] = useState<string[]>(
    isEditing ? ["alerta@ejemplo.com"] : []
  );
  const [numerosWhatsapp, setNumerosWhatsapp] = useState<string[]>(
    isEditing ? ["+573001234567"] : []
  );

  const [nuevoEmailNotificacion, setNuevoEmailNotificacion] = useState("");
  const [nuevoEmailAlerta, setNuevoEmailAlerta] = useState("");
  const [nuevoNumeroWhatsapp, setNuevoNumeroWhatsapp] = useState("");

  // Funciones para agregar nuevos destinatarios
  const agregarEmailNotificacion = () => {
    if (nuevoEmailNotificacion.trim() && !emailsNotificaciones.includes(nuevoEmailNotificacion.trim())) {
      setEmailsNotificaciones(prev => [...prev, nuevoEmailNotificacion.trim()]);
      setNuevoEmailNotificacion("");
    }
  };

  const agregarEmailAlerta = () => {
    if (nuevoEmailAlerta.trim() && !emailsAlertas.includes(nuevoEmailAlerta.trim())) {
      setEmailsAlertas(prev => [...prev, nuevoEmailAlerta.trim()]);
      setNuevoEmailAlerta("");
    }
  };

  const agregarNumeroWhatsapp = () => {
    if (nuevoNumeroWhatsapp.trim() && !numerosWhatsapp.includes(nuevoNumeroWhatsapp.trim())) {
      setNumerosWhatsapp(prev => [...prev, nuevoNumeroWhatsapp.trim()]);
      setNuevoNumeroWhatsapp("");
    }
  };

  // Funciones para eliminar destinatarios
  const eliminarEmailNotificacion = (email: string) => {
    setEmailsNotificaciones(prev => prev.filter(e => e !== email));
  };

  const eliminarEmailAlerta = (email: string) => {
    setEmailsAlertas(prev => prev.filter(e => e !== email));
  };

  const eliminarNumeroWhatsapp = (numero: string) => {
    setNumerosWhatsapp(prev => prev.filter(n => n !== numero));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-purple-800">Notificaciones</h2>
      </div>
      <div className="p-6 space-y-8">
        
        {/* Sección Email Notificaciones y Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Email Notificaciones */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900">Email Reportes</h3>
            </div>
            
            {/* Campo para agregar nuevo email */}
            <div className="flex gap-2">
              <input
                type="email"
                value={nuevoEmailNotificacion}
                onChange={(e) => setNuevoEmailNotificacion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarEmailNotificacion();
                  }
                }}
                placeholder="notificacion@ejemplo.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={agregarEmailNotificacion}
                disabled={!nuevoEmailNotificacion.trim()}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Lista de emails de notificaciones */}
            <div className="space-y-2">
              {emailsNotificaciones.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-blue-800">{email}</span>
                  <button
                    type="button"
                    onClick={() => eliminarEmailNotificacion(email)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {emailsNotificaciones.length === 0 && (
                <p className="text-sm text-gray-500 italic">No hay emails de notificación configurados</p>
              )}
            </div>

            {/* Hidden inputs para el formulario */}
            {emailsNotificaciones.map((email, index) => (
              <input
                key={index}
                type="hidden"
                name="emailsNotificaciones"
                value={email}
              />
            ))}
          </div>

          {/* Email Alertas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900">Email Alertas</h3>
            </div>
            
            {/* Campo para agregar nuevo email de alerta */}
            <div className="flex gap-2">
              <input
                type="email"
                value={nuevoEmailAlerta}
                onChange={(e) => setNuevoEmailAlerta(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarEmailAlerta();
                  }
                }}
                placeholder="alerta@ejemplo.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={agregarEmailAlerta}
                disabled={!nuevoEmailAlerta.trim()}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Lista de emails de alertas */}
            <div className="space-y-2">
              {emailsAlertas.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-red-800">{email}</span>
                  <button
                    type="button"
                    onClick={() => eliminarEmailAlerta(email)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {emailsAlertas.length === 0 && (
                <p className="text-sm text-gray-500 italic">No hay emails de alerta configurados</p>
              )}
            </div>

            {/* Hidden inputs para el formulario */}
            {emailsAlertas.map((email, index) => (
              <input
                key={index}
                type="hidden"
                name="emailsAlertas"
                value={email}
              />
            ))}
          </div>
        </div>

        {/* Sección WhatsApp */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-900">WhatsApp Alertas</h3>
          </div>
          
          {/* Campo para agregar nuevo número WhatsApp */}
          <div className="flex gap-2">
            <input
              type="tel"
              value={nuevoNumeroWhatsapp}
              onChange={(e) => setNuevoNumeroWhatsapp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  agregarNumeroWhatsapp();
                }
              }}
              placeholder="+573001234567"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={agregarNumeroWhatsapp}
              disabled={!nuevoNumeroWhatsapp.trim()}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Lista de números WhatsApp */}
          <div className="space-y-2">
            {numerosWhatsapp.map((numero, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <span className="text-sm text-green-800">{numero}</span>
                <button
                  type="button"
                  onClick={() => eliminarNumeroWhatsapp(numero)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {numerosWhatsapp.length === 0 && (
              <p className="text-sm text-gray-500 italic">No hay números de WhatsApp configurados</p>
            )}
          </div>

          {/* Hidden inputs para el formulario */}
          {numerosWhatsapp.map((numero, index) => (
            <input
              key={index}
              type="hidden"
              name="numerosWhatsapp"
              value={numero}
            />
          ))}
        </div>
      </div>
    </div>
  );
}