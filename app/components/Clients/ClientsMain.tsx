// components/Clientes/ClientesMain.tsx
import { useState } from "react";
import { Link } from "@remix-run/react";

export default function ClientesMain() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');

  const clientes = [
    {
      id: 1,
      nombre: "CDC - Clínica Del Country",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 9,
      ultimoAcceso: "23/05/2025"
    },
    {
      id: 2,
      nombre: "CMI - Imbanaco",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 4,
      ultimoAcceso: "23/05/2025"
    },
    {
      id: 3,
      nombre: "FCI - Fundación CardioInfantil",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 9,
      ultimoAcceso: "22/05/2025"
    },
    {
      id: 4,
      nombre: "FVL - Fundación Valle del Lili",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 22,
      ultimoAcceso: "22/05/2025"
    },
    {
      id: 5,
      nombre: "HGPS - Hospital General de la Plaza de la Salud",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 4,
      ultimoAcceso: "21/05/2025"
    },
    {
      id: 6,
      nombre: "HSJ - Hospital de San José",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "21/05/2025"
    },
    {
      id: 7,
      nombre: "INDC - Instituto Nacional Cancer Informa",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 7,
      ultimoAcceso: "20/05/2025"
    },
    {
      id: 8,
      nombre: "INDC - Instituto Nacional de Cancerología VIDA Y CANCER",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 10,
      ultimoAcceso: "20/05/2025"
    },
    {
      id: 9,
      nombre: "LCB - Los Cobos",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "19/05/2025"
    },
    {
      id: 10,
      nombre: "LCC - Liga Colombiana Contra el Cáncer",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 3,
      ultimoAcceso: "19/05/2025"
    },
    {
      id: 11,
      nombre: "LMC - Leon Medical Centers",
      sector: "",
      admin: "yessica",
      activo: true,
      winbox: 15,
      ultimoAcceso: "18/05/2025"
    },
    {
      id: 12,
      nombre: "UPB - Universidad pontificia bolivariana",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "18/05/2025"
    }
  ];

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
            <span className="text-gray-900 font-medium">Clientes</span>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestionar Clientes</h1>
          <p className="text-gray-600">Administra y organiza todos tus clientes institucionales.</p>
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
                  placeholder="Buscar clientes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todos los sectores</option>
              <option>Salud</option>
              <option>Educación</option>
              <option>Gobierno</option>
            </select>

            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Inactivo</option>
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

            <Link
              to="/dashboard/clients/new"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Cliente
            </Link>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                        {cliente.nombre}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        {cliente.sector && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600">
                            {cliente.sector}
                          </span>
                        )}
                        {cliente.activo && (
                          <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Admin: {cliente.admin}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{cliente.winbox} Winbox</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Último acceso:</span>
                      <span className="font-medium">{cliente.ultimoAcceso}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estado:</span>
                      <span className={`font-medium ${cliente.activo ? 'text-green-600' : 'text-red-600'}`}>
                        {cliente.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/dashboard/clients/${cliente.id}/edit`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/dashboard/clients/${cliente.id}`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                    >
                      Ver
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre de Cliente</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sector</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Admin</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Winbox</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Último Acceso</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 hover:text-purple-600 cursor-pointer">
                              {cliente.nombre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {cliente.sector ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600">
                            {cliente.sector}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {cliente.admin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-600">
                          {cliente.winbox}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {cliente.ultimoAcceso}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {cliente.activo && (
                          <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-center">
                          <Link
                            to={`/dashboard/clients/${cliente.id}/edit`}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <Link
                            to={`/dashboard/clients/${cliente.id}`}
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
            Mostrando <span className="font-medium text-gray-900">1-12</span> de <span className="font-medium text-gray-900">12</span> clientes
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