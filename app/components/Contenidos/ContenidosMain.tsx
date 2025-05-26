// components/ContenidosMain.tsx
import { useState } from "react";

export default function ContenidosMain() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const contenidos = [
    {
      id: 1,
      titulo: "INDC - Testimonio David Gallo",
      tipo: "Video",
      duracion: "00:01:12",
      tamaño: "35.11 MB",
      fecha: "23/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=120&fit=crop&crop=center",
      usuario: "Dr. María González",
      vistas: 1240,
      descripcion: "Testimonio del Dr. David Gallo sobre los procedimientos institucionales y protocolos de atención médica.",
      url: "https://miapp.com/videos/indc-testimonio-david-gallo"
    },
    {
      id: 2,
      titulo: "HSJ - ¿Qué pasa con la sangre que dono?",
      tipo: "Video",
      duracion: "00:01:58",
      tamaño: "11.38 MB",
      fecha: "23/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=120&fit=crop&crop=center",
      usuario: "Ana Rodríguez",
      vistas: 892,
      descripcion: "Video educativo que explica el proceso y destino de la sangre donada en nuestros centros médicos.",
      url: "https://miapp.com/videos/hsj-sangre-donacion"
    },
    {
      id: 3,
      titulo: "CDC - Video institucional 2025",
      tipo: "Video",
      duracion: "00:04:10",
      tamaño: "52.10 MB",
      fecha: "23/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop&crop=center",
      usuario: "Carlos Mendoza",
      vistas: 2156,
      descripcion: "Presentación institucional del Centro de Control de Enfermedades con estadísticas y proyecciones 2025.",
      url: "https://miapp.com/videos/cdc-institucional-2025"
    },
    {
      id: 4,
      titulo: "COLINA - Asociación de usuarios",
      tipo: "Video",
      duracion: "00:00:32",
      tamaño: "18.99 MB",
      fecha: "23/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=120&fit=crop&crop=center",
      usuario: "Laura Jiménez",
      vistas: 567,
      descripcion: "Información sobre los servicios y beneficios de la asociación de usuarios COLINA.",
      url: "https://miapp.com/videos/colina-asociacion"
    },
    {
      id: 5,
      titulo: "CDC - Asociación de usuarios",
      tipo: "Video",
      duracion: "00:01:01",
      tamaño: "83.28 MB",
      fecha: "23/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop&crop=center",
      usuario: "Roberto Silva",
      vistas: 1893,
      descripcion: "Guía completa sobre los derechos y deberes de los usuarios del sistema de salud CDC.",
      url: "https://miapp.com/videos/cdc-asociacion-usuarios"
    },
    {
      id: 6,
      titulo: "FVL - Prevención del riesgo 2025",
      tipo: "Video",
      duracion: "00:01:00",
      tamaño: "6.98 MB",
      fecha: "22/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=120&fit=crop&crop=center",
      usuario: "Patricia León",
      vistas: 734,
      descripcion: "Protocolo actualizado de prevención de riesgos laborales y medidas de seguridad 2025.",
      url: "https://miapp.com/videos/fvl-prevencion-riesgo"
    },
    {
      id: 7,
      titulo: "FVL - Prevención del riesgo de caídas 2025",
      tipo: "Video",
      duracion: "00:01:30",
      tamaño: "10.39 MB",
      fecha: "21/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=120&fit=crop&crop=center",
      usuario: "Dr. Fernando Ruiz",
      vistas: 1045,
      descripcion: "Manual de prevención de caídas para pacientes y personal médico con ejercicios prácticos.",
      url: "https://miapp.com/videos/fvl-prevencion-caidas"
    },
    {
      id: 8,
      titulo: "FVL - Mecanismos de participación 2025",
      tipo: "Video",
      duracion: "00:01:05",
      tamaño: "7.81 MB",
      fecha: "21/05/2025",
      validado: true,
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=120&fit=crop&crop=center",
      usuario: "Sandra Torres",
      vistas: 423,
      descripcion: "Nuevos mecanismos de participación ciudadana en programas de salud y bienestar social.",
      url: "https://miapp.com/videos/fvl-participacion"
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
            <span className="text-gray-900 font-medium">Contenidos</span>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestionar Contenidos</h1>
          <p className="text-gray-600">Administra y organiza todos tus contenidos multimedia.</p>
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
                  placeholder="Buscar contenidos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Todos los tipos</option>
              <option>Video</option>
              <option>Imagen</option>
              <option>Audio</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

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

            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Contenido
            </button>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {contenidos.map((contenido) => (
              <div key={contenido.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Thumbnail */}
                <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={contenido.thumbnail} 
                    alt={contenido.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200">
                      <svg className="w-6 h-6 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {contenido.duracion}
                  </div>

                  {/* Share Button */}
                  <button 
                    onClick={() => navigator.clipboard.writeText(contenido.url)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all group/share"
                    title="Copiar enlace"
                  >
                    <svg className="w-4 h-4 text-gray-600 group-hover/share:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                        {contenido.titulo}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-600">
                          {contenido.tipo}
                        </span>
                        {contenido.validado && (
                          <div className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-4 line-clamp-3">
                    {contenido.descripcion}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{contenido.vistas.toLocaleString()} vistas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{contenido.usuario}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Tamaño:</span>
                      <span className="font-medium">{contenido.tamaño}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fecha:</span>
                      <span className="font-medium">{contenido.fecha}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      Editar
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      Ver
                    </button>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contenido</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duración</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tamaño</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contenidos.map((contenido, index) => (
                    <tr key={contenido.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={contenido.thumbnail} 
                              alt={contenido.titulo}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 hover:text-purple-600 cursor-pointer">
                              {contenido.titulo}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-600">
                          {contenido.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 font-mono">
                          {contenido.duracion}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {contenido.tamaño}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {contenido.fecha}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {contenido.validado && (
                          <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-center">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-purple-600 hover:text-purple-800 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
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
            Mostrando <span className="font-medium text-gray-900">1-8</span> de <span className="font-medium text-gray-900">8</span> contenidos
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