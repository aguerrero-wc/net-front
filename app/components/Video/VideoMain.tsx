import { useState } from 'react';
import { Link } from '@remix-run/react';

// Tipos TypeScript para el componente
interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  size: string;
  uploadDate: string;
  author: string;
  views: number;
  status: 'published' | 'draft';
  categories: string[];
  keywords: string[];
  availableFor: Array<{
    id: string;
    name: string;
    active: boolean;
  }>;
  transcription: string;
}

interface VideoDetailViewProps {
  video: VideoData;
  onUpdateKeywords?: (keywords: string[]) => void;
  onUpdateClients?: (clientIds: string[]) => void;
}

export default function VideoDetailView({ 
  video, 
  onUpdateKeywords, 
  onUpdateClients 
}: VideoDetailViewProps) {
  const [showFullTranscription, setShowFullTranscription] = useState(false);
  const [selectedClients, setSelectedClients] = useState(
    video.availableFor.filter(client => client.active).map(client => client.id)
  );
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState(video.keywords);

  const handleClientToggle = (clientId: string) => {
    const newSelection = selectedClients.includes(clientId) 
      ? selectedClients.filter(id => id !== clientId)
      : [...selectedClients, clientId];
    
    setSelectedClients(newSelection);
    onUpdateClients?.(newSelection);
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const newKeywords = [...keywords, newKeyword.trim()];
      setKeywords(newKeywords);
      setNewKeyword('');
      onUpdateKeywords?.(newKeywords);
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter(k => k !== keywordToRemove);
    setKeywords(newKeywords);
    onUpdateKeywords?.(newKeywords);
  };

  const truncatedTranscription = video.transcription.split(' ').slice(0, 25).join(' ') + '...';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Link 
                to="/videos" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
                <p className="text-sm text-gray-500 mt-1">{video.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                video.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {video.status === 'published' ? 'Publicado' : 'Borrador'}
              </span>
              <Link 
                to={`/videos/${video.id}/edit`}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Editar Video
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Video y Detalles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full p-4 shadow-lg">
                    <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {video.views.toLocaleString()} vistas
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {video.author}
                    </span>
                    <span>{video.uploadDate}</span>
                  </div>
                  <span className="text-sm text-gray-500">{video.size}</span>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Transcripción */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Transcripción automática
                    </h3>
                    <button 
                      onClick={() => setShowFullTranscription(!showFullTranscription)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                    >
                      {showFullTranscription ? 'Ver menos' : 'Ver más'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {showFullTranscription ? video.transcription : truncatedTranscription}
                  </p>
                </div>
              </div>
            </div>

            {/* Palabras Clave */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Palabras Clave</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center group hover:bg-gray-200 transition-colors"
                  >
                    {keyword}
                    <button 
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  placeholder="Agregar palabra clave..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button 
                  onClick={addKeyword}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Disponibilidad para Clientes */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponible para Clientes</h3>
              <div className="space-y-3">
                {video.availableFor.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => handleClientToggle(client.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar Cliente
              </button>
            </div>

            {/* Analytics Quick View */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reproducciones</span>
                  <span className="text-sm font-semibold text-gray-900">{video.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Descargas</span>
                  <span className="text-sm font-semibold text-gray-900">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Compartido</span>
                  <span className="text-sm font-semibold text-gray-900">12</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <Link 
                    to={`/videos/${video.id}/analytics`}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                  >
                    Ver analytics completos →
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Compartir Video
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Descargar
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  Duplicar
                </button>
                <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}