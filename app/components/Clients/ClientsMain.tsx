// components/Clientes/ClientesMain.tsx
import { useState } from "react";
import { Link } from "@remix-run/react";

export default function ClientesMain() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const clientes = [
    {
      id: 1,
      nombre: "CDC - Clínica Del Country",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 9,
      ultimoAcceso: "23/05/2025",
      logo: "🏥"
    },
    {
      id: 2,
      nombre: "CMI - Imbanaco",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 4,
      ultimoAcceso: "23/05/2025",
      logo: "🏥"
    },
    {
      id: 3,
      nombre: "FCI - Fundación CardioInfantil",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 9,
      ultimoAcceso: "22/05/2025",
      logo: "❤️"
    },
    {
      id: 4,
      nombre: "FVL - Fundación Valle del Lili",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 22,
      ultimoAcceso: "22/05/2025",
      logo: "🏥"
    },
    {
      id: 5,
      nombre: "HGPS - Hospital General de la Plaza de la Salud",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 4,
      ultimoAcceso: "21/05/2025",
      logo: "🏥"
    },
    {
      id: 6,
      nombre: "HSJ - Hospital de San José",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "21/05/2025",
      logo: "⚕️"
    },
    {
      id: 7,
      nombre: "INDC - Instituto Nacional Cancer Informa",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 7,
      ultimoAcceso: "20/05/2025",
      logo: "🎗️"
    },
    {
      id: 8,
      nombre: "INDC - Instituto Nacional de Cancerología VIDA Y CANCER",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 10,
      ultimoAcceso: "20/05/2025",
      logo: "🎗️"
    },
    {
      id: 9,
      nombre: "LCB - Los Cobos",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "19/05/2025",
      logo: "🏥"
    },
    {
      id: 10,
      nombre: "LCC - Liga Colombiana Contra el Cáncer",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 3,
      ultimoAcceso: "19/05/2025",
      logo: "🎗️"
    },
    {
      id: 11,
      nombre: "LMC - Leon Medical Centers",
      sector: "Salud",
      admin: "yessica",
      activo: true,
      winbox: 15,
      ultimoAcceso: "18/05/2025",
      logo: "🏥"
    },
    {
      id: 12,
      nombre: "UPB - Universidad pontificia bolivariana",
      sector: "Educación",
      admin: "yessica",
      activo: true,
      winbox: 2,
      ultimoAcceso: "18/05/2025",
      logo: "🎓"
    }
  ];

  // Filtrar clientes
  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || cliente.sector === selectedSector;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "active" && cliente.activo) ||
      (selectedStatus === "inactive" && !cliente.activo);
    
    return matchesSearch && matchesSector && matchesStatus;
  });

  return (
    <div className="flex-1 bg-gradient-to-br from-orange-50 via-sky-50 to-emerald-50 min-h-screen relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6600D] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/50 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb mejorado */}
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#E6600D] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">Clientes</span>
            </nav>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button className="p-2.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-xl text-gray-600 hover:text-[#E6600D] hover:bg-white/80 transition-all hover:scale-105 active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-2.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-xl text-gray-600 hover:text-[#E6600D] hover:bg-white/80 transition-all hover:scale-105 active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 relative z-10">
        {/* Título con icono */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestionar Clientes</h1>
            <p className="text-gray-600 mt-1">Administra y organiza todos tus clientes institucionales</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar clientes..."
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            {/* Sector Filter */}
            <select 
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            >
              <option value="all">Todos los sectores</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
              <option value="Gobierno">Gobierno</option>
            </select>

            {/* Status Filter */}
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>

            {/* View Toggle */}
            <div className="flex backdrop-blur-sm bg-white/50 rounded-2xl p-1 border border-gray-200/50">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* New Client Button */}
            <Link
              to="/dashboard/clients/new"
              className="bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Cliente
            </Link>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-4 px-2">
            <p className="text-sm text-gray-600">
              Se encontraron <span className="font-semibold text-[#E6600D]">{filteredClientes.length}</span> resultados
            </p>
          </div>
        )}

        {/* Content Display */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClientes.map((cliente) => (
              <div key={cliente.id} className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-[#E6600D]/5 to-[#FF7A2F]/5 border-b border-white/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {cliente.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-[#E6600D] transition-colors cursor-pointer">
                          {cliente.nombre}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          {cliente.sector && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-sky-700 border border-sky-200/50">
                              {cliente.sector}
                            </span>
                          )}
                          {cliente.activo && (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30">
                              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="backdrop-blur-sm bg-white/50 rounded-xl p-3 border border-gray-200/50">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <svg className="w-4 h-4 text-[#E6600D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Admin</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{cliente.admin}</p>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/50 rounded-xl p-3 border border-gray-200/50">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <svg className="w-4 h-4 text-[#E6600D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>Winbox</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{cliente.winbox}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 text-sm mb-5">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                      <span className="text-gray-600">Último acceso:</span>
                      <span className="font-medium text-gray-900">{cliente.ultimoAcceso}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`font-semibold flex items-center gap-1 ${cliente.activo ? 'text-emerald-600' : 'text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${cliente.activo ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        {cliente.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/dashboard/clients/${cliente.id}/edit`}
                      className="flex-1 backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-gray-200/50 text-gray-700 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 text-center"
                    >
                      Editar
                    </Link>
                    <Link
                      to={`/dashboard/clients/${cliente.id}`}
                      className="flex-1 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] hover:shadow-lg text-white px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 text-center"
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
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#E6600D]/10 to-[#FF7A2F]/10 border-b border-white/50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cliente</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Sector</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Admin</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Winbox</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Último Acceso</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/50">
                  {filteredClientes.map((cliente, index) => (
                    <tr 
                      key={cliente.id} 
                      className={`hover:bg-white/30 transition-all ${index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0 text-xl">
                            {cliente.logo}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 hover:text-[#E6600D] cursor-pointer transition-colors">
                              {cliente.nombre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {cliente.sector ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-sky-700 border border-sky-200/50">
                            {cliente.sector}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {cliente.admin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 border border-amber-200/50">
                          {cliente.winbox}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {cliente.ultimoAcceso}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {cliente.activo ? (
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
                            to={`/dashboard/clients/${cliente.id}/edit`}
                            className="p-2 text-gray-600 hover:text-[#E6600D] transition-colors rounded-xl hover:bg-orange-50/50"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <Link
                            to={`/dashboard/clients/${cliente.id}`}
                            className="p-2 text-[#E6600D] hover:text-[#CC5509] transition-colors rounded-xl hover:bg-orange-50/50"
                            title="Ver detalles"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button 
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50/50"
                            title="Más opciones"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Empty State */}
        {filteredClientes.length === 0 && (
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron clientes</h3>
            <p className="text-gray-600 mb-6">Intenta ajustar tus filtros de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSector("all");
                setSelectedStatus("all");
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredClientes.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-[#E6600D]">1-{filteredClientes.length}</span> de <span className="font-semibold text-[#E6600D]">{filteredClientes.length}</span> clientes
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-5 py-2.5 text-sm font-semibold text-gray-400 backdrop-blur-sm bg-white/40 border border-gray-200/50 rounded-2xl cursor-not-allowed"
              >
                Anterior
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg">
                1
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animaciones CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
}