// app/components/Clients/shared/ClientsTable.tsx
import { Link } from "@remix-run/react";
import type { ClientListItem } from "../hooks/useClients";

interface ClientsTableProps {
  clients: ClientListItem[];
  getClientDisplay: (client: ClientListItem) => { type: string; value: string };
  formatDate: (date: string) => string;
}

export function ClientsTable({ clients, getClientDisplay, formatDate }: ClientsTableProps) {
  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#E6600D]/10 to-[#FF7A2F]/10 border-b border-white/50">
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cliente</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Servicios Externos</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Contactos</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Estado</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/50">
            {clients.map((client, index) => {
              const display = getClientDisplay(client);
              
              return (
                <tr 
                  key={client.id} 
                  className={`hover:bg-white/30 transition-all ${index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                        {display.type === 'image' ? (
                          <img src={display.value} alt={client.name} className="w-full h-full object-cover rounded-2xl" />
                        ) : display.type === 'emoji' ? (
                          <span className="text-xl">{display.value}</span>
                        ) : (
                          <span className="text-sm font-bold text-white">{display.value}</span>
                        )}
                      </div>
                      <div>
                        <Link
                          to={`/dashboard/clients/${client.id}/edit`}
                          className="text-sm font-semibold text-gray-900 hover:text-[#E6600D] transition-colors"
                        >
                          {client.name}
                        </Link>
                        {client.domain && (
                          <p className="text-xs text-gray-500">{client.domain}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 border border-amber-200/50">
                      {client.servicesCount || 0}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border border-blue-200/50">
                      {client.contactsCount || 0}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    {client.isActive ? (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full border border-red-500/30">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <Link
                        to={`/dashboard/clients/${client.id}/edit`}
                        className="p-2 text-gray-600 hover:text-[#E6600D] transition-colors rounded-xl hover:bg-orange-50/50"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      {/* <Link
                        to={`/dashboard/clients/${client.id}`}
                        className="p-2 text-[#E6600D] hover:text-[#CC5509] transition-colors rounded-xl hover:bg-orange-50/50"
                        title="Ver detalles"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}