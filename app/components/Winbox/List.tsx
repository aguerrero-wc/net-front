// components/Winbox/WinboxMain.tsx
import { useState } from "react";
import { Link } from "@remix-run/react";

export default function WinboxMain() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');

  const winboxes = [
    {
      id: 278,
      nombre: "Cr 15",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "5E84-C1E6-CE87-4058-CB2A-C5",
      ubicacion: "Bogotá",
      conectado: true,
      lastSeen: null, // Solo para equipos desconectados
      programacion: 10,
      intervenciones: 5,
      logs: 15
    },
    {
      id: 633,
      nombre: "Cr 16 Sotano",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "036C-6026-5858-1860-669C-63",
      ubicacion: "Bogotá",
      conectado: true,
      lastSeen: null,
      programacion: 8,
      intervenciones: 3,
      logs: 12
    },
    {
      id: 548,
      nombre: "Ginecologia",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "C338-7681-A6F3-5602-634E-D8",
      ubicacion: "Bogotá",
      conectado: true,
      lastSeen: null,
      programacion: 6,
      intervenciones: 2,
      logs: 8
    },
    {
      id: 669,
      nombre: "Sin uso 2",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "77E0-2965-1184-3E6C-9A34-5F",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-25 14:32",
      programacion: 0,
      intervenciones: 0,
      logs: 2
    },
    {
      id: 674,
      nombre: "Oficina Comunicacion",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "7556-EFDE-DD86-1638-B68E-15",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-24 09:15",
      programacion: 0,
      intervenciones: 1,
      logs: 3
    },
    {
      id: 662,
      nombre: "Calle 122",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "EC87-6CCC-45CC-1FD4-6DB0-AF",
      ubicacion: "Bogotá",
      conectado: true,
      lastSeen: null,
      programacion: 12,
      intervenciones: 4,
      logs: 18
    },
    {
      id: 725,
      nombre: "sin uso 3",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "14.2.7",
      licencia: "81CF-2800-CAE4-F4D6-86D6-12",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-22 16:45",
      programacion: 0,
      intervenciones: 0,
      logs: 1
    },
    {
      id: 726,
      nombre: "Monitoreo",
      cliente: "CDC - Clínica Del Country",
      versionWinbox: "15.0.0",
      licencia: "6E84-D7F0-B4DF-9857-DD70-7D",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-23 11:20",
      programacion: 0,
      intervenciones: 2,
      logs: 5
    },
    {
      id: 544,
      nombre: "desarrollos",
      cliente: "FCI - Fundación CardioInfantil",
      versionWinbox: "14.2.7",
      licencia: "2758-6168-A069-F7A8-9918-24",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-21 13:08",
      programacion: 0,
      intervenciones: 1,
      logs: 4
    },
    {
      id: 651,
      nombre: "Winbox 2 LMC",
      cliente: "FCI - Fundación CardioInfantil",
      versionWinbox: "14.2.7",
      licencia: "FC8E-A207-E236-7A5C-F383-02",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-20 08:45",
      programacion: 0,
      intervenciones: 0,
      logs: 2
    },
    {
      id: 683,
      nombre: "Winbox 3 LMC",
      cliente: "FCI - Fundación CardioInfantil",
      versionWinbox: "14.2.7",
      licencia: "529C-12FE-7E68-2CE2-8D27-8F",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-19 17:30",
      programacion: 0,
      intervenciones: 0,
      logs: 1
    },
    {
      id: 678,
      nombre: "Gastroenterologia",
      cliente: "FCI - Fundación CardioInfantil",
      versionWinbox: "14.2.7",
      licencia: "7890-2813-48F6-5779-659A-D0",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-18 14:22",
      programacion: 0,
      intervenciones: 0,
      logs: 3
    },
    {
      id: 679,
      nombre: "Sala de Cirugia",
      cliente: "FCI - Fundación CardioInfantil",
      versionWinbox: "14.2.7",
      licencia: "2C87-8EC8-2831-64F5-14A7-8F",
      ubicacion: "Bogotá",
      conectado: false,
      lastSeen: "2025-05-17 10:15",
      programacion: 0,
      intervenciones: 0,
      logs: 2
    }
  ];

  const getConectadoColor = (conectado: boolean) => {
    return conectado ? 'text-green-600' : 'text-red-600';
  };

  const getConectadoBadge = (conectado: boolean) => {
    return conectado 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <span>🏠</span>
            <span>Home</span>
            <span>›</span>
            <span className="text-gray-900 font-medium">Monitoreo Winboxes</span>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Monitoreo de Winboxes</h1>
              <p className="text-gray-600">Supervisa el estado de conectividad y actividad de todos los dispositivos Winbox en tiempo real.</p>
            </div>
            <Link
              to="/dashboard/winboxs/new"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Winbox
            </Link>
          </div>

          {/* Stats Summary */}
          <div className="flex items-center gap-8 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Conectados</span>
              <span className="font-semibold text-gray-900">{winboxes.filter(w => w.conectado).length}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Desconectados</span>
              <span className="font-semibold text-gray-900">{winboxes.filter(w => !w.conectado).length}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Total</span>
              <span className="font-semibold text-gray-900">{winboxes.length}</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar winboxes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todos los clientes</option>
              <option>CDC - Clínica Del Country</option>
              <option>FCI - Fundación CardioInfantil</option>
            </select>

            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todos los estados</option>
              <option>Conectado</option>
              <option>Desconectado</option>
            </select>

            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todas las versiones</option>
              <option>14.2.7</option>
              <option>15.0.0</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {winboxes.map((winbox) => (
              <div key={winbox.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getConectadoBadge(winbox.conectado)}`}>
                          {winbox.conectado ? 'Conectado' : 'Desconectado'}
                        </span>
                      </div>
                      {!winbox.conectado && winbox.lastSeen && (
                        <p className="text-xs text-gray-500 mb-2">
                          Última vez visto: {winbox.lastSeen}
                        </p>
                      )}
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors cursor-pointer">
                        {winbox.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{winbox.ubicacion}</p>
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Versión:</span>
                      <span className="font-medium text-gray-900">{winbox.versionWinbox}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <Link
                        to={`/dashboard/winboxs/${winbox.id}/schedule`}
                        className="flex flex-col items-center justify-center h-full hover:bg-blue-100 transition-colors rounded-lg"
                      >
                        <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="text-xs text-blue-700">Programacion</div>
                      </Link>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <Link
                        to={`/dashboard/winboxs/${winbox.id}/reports`}
                        className="flex flex-col items-center justify-center h-full hover:bg-orange-100 transition-colors rounded-lg"
                      >
                        <svg className="w-5 h-5 text-orange-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div className="text-xs text-orange-700">Reportar</div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/dashboard/winboxs/${winbox.id}/details`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Versión</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ubicación</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Programacion</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Reportar</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {winboxes.map((winbox) => (
                    <tr key={winbox.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getConectadoBadge(winbox.conectado)}`}>
                            {winbox.conectado ? 'Conectado' : 'Desconectado'}
                          </span>
                          {!winbox.conectado && winbox.lastSeen && (
                            <span className="text-xs text-gray-500 mt-1">
                              Última vez: {winbox.lastSeen}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900 hover:text-purple-600 cursor-pointer">
                          {winbox.nombre}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                          {winbox.versionWinbox}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{winbox.ubicacion}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/dashboard/winboxs/${winbox.id}/schedule`}
                          className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Programar winbox"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/dashboard/winboxs/${winbox.id}/reports`}
                          className="inline-flex items-center justify-center w-8 h-8 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Crear reporte"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-center">
                          <Link
                            to={`/dashboard/winboxs/${winbox.id}/details`}
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </Link>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-500">
            Mostrando <span className="font-medium text-gray-900">1-13</span> de <span className="font-medium text-gray-900">13</span> winboxes
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            >
              Anterior
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-lg">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}