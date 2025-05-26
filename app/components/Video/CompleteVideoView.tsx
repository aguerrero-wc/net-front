import { useEffect, useRef, useState } from 'react';
import { Link } from '@remix-run/react';

// Mock data para simular la respuesta del backend
const mockVideoData = {
  id: 'hsj-001',
  title: 'HSJ - ¿Qué pasa con la sangre que dono?',
  description: 'Video educativo que explica el proceso y destino de la sangre donada en nuestros centros médicos.',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  duration: '00:01:58',
  size: '11.38 MB',
  uploadDate: '23/05/2025',
  author: 'Ana Rodríguez',
  status: 'published' as 'published' | 'draft' | 'restricted' | 'archived' | 'review',
  categories: ['Educativo', 'Salud', 'Donación'],
  keywords: ['sangre', 'donación', 'proceso médico', 'HSJ', 'educativo'],
  transcription: `En este video explicaremos qué sucede con la sangre que donas. Primero, la sangre se recolecta en bolsas estériles especiales que garantizan la máxima seguridad. Luego pasa por un riguroso proceso de análisis donde se verifican múltiples factores incluyendo tipo de sangre, anticuerpos y posibles enfermedades transmisibles. Una vez aprobada según nuestros estrictos estándares de calidad, la sangre se separa cuidadosamente en sus componentes principales: glóbulos rojos, plasma y plaquetas. Cada componente tiene diferentes usos médicos específicos y pueden ayudar a múltiples pacientes con diversas necesidades. Los glóbulos rojos se utilizan principalmente en cirugías complejas y situaciones de trauma, el plasma es fundamental para ayudar en casos de quemaduras graves y problemas de coagulación, mientras que las plaquetas son absolutamente cruciales para pacientes con cáncer y trastornos hematológicos. Todo este proceso está altamente regulado y constantemente monitoreado para garantizar la máxima seguridad tanto para nuestros generosos donantes como para los pacientes receptores.`
};

// Simulación simple de Video.js (para que funcione sin instalación)
interface SimpleVideoPlayerProps {
  src: string;
  poster: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

function SimpleVideoPlayer({ src, poster, onPlay, onPause, onEnded }: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause?.();
      } else {
        videoRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="w-full aspect-video"
      />
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlay}
            className="text-white hover:text-purple-300 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <div className="flex-1 bg-gray-600 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Componente principal de la vista de video
export default function CompleteVideoView() {
  const [showFullTranscription, setShowFullTranscription] = useState(false);
  const [addedClients, setAddedClients] = useState([
    { id: 'hsj', name: 'HSJ - Hospital de San José' },
    { id: 'cdc', name: 'CDC - Clínica Del Country' }
  ]);
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState(mockVideoData.keywords);
  const [isGlobalVideo, setIsGlobalVideo] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(mockVideoData.status);
  const [showThumbnailEdit, setShowThumbnailEdit] = useState(false);

  // Función para obtener el estilo del estado
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'restricted':
        return 'bg-red-100 text-red-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const removeClient = (clientId: string) => {
    setAddedClients(prev => prev.filter(client => client.id !== clientId));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  // Clientes disponibles para agregar (mock data)
  const availableClientsToAdd = [
    { id: 'cmi', name: 'CMI - Clínica Medellín' },
    { id: 'hvl', name: 'HVL - Hospital Valle del Lili' },
    { id: 'fvl', name: 'FVL - Fundación Valle del Lili' },
    { id: 'hptu', name: 'HPTU - Hospital Pablo Tobón Uribe' },
    { id: 'ces', name: 'CES - Clínica CES' },
    { id: 'ips', name: 'IPS - Universitaria' },
    { id: 'husi', name: 'HUSI - Hospital Universitario San Ignacio' },
    { id: 'hul', name: 'HUL - Hospital Universitario de La Samaritana' },
    { id: 'colsanitas', name: 'Clínica Colsanitas' },
    { id: 'country', name: 'Clínica del Country' },
    { id: 'shaio', name: 'Clínica Shaio' },
    { id: 'reina_sofia', name: 'Clínica Reina Sofía' },
    { id: 'marly', name: 'Clínica Marly' },
    { id: 'palermo', name: 'Clínica de Palermo' },
    { id: 'santa_fe', name: 'Hospital Santa Fe de Bogotá' }
  ].filter(client => !addedClients.some(existing => existing.id === client.id));

  const handleAddClient = (clientId: string) => {
    const clientToAdd = availableClientsToAdd.find(c => c.id === clientId);
    if (clientToAdd) {
      setAddedClients(prev => [...prev, { id: clientToAdd.id, name: clientToAdd.name }]);
    }
    setShowAddClientModal(false);
  };

  const truncatedTranscription = mockVideoData.transcription.split(' ').slice(0, 25).join(' ') + '...';

  // Componente Modal para Agregar Clientes
  const AddClientModal = () => {
    if (!showAddClientModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-96 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Agregar Cliente</h3>
            <button 
              onClick={() => setShowAddClientModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {availableClientsToAdd.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleAddClient(client.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-purple-300"
                >
                  <div className="font-medium text-gray-900">{client.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente Modal para Editar Thumbnail
  const ThumbnailEditModal = () => {
    if (!showThumbnailEdit) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Editar Thumbnail</h3>
            <button 
              onClick={() => setShowThumbnailEdit(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {/* Thumbnail actual */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Thumbnail actual:</p>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={mockVideoData.thumbnail} 
                  alt="Thumbnail actual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Opciones de thumbnail */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subir nuevo thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Arrastra una imagen aquí o <span className="text-purple-600 font-medium">haz clic para seleccionar</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  O generar desde el video
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="aspect-video bg-gray-100 rounded border-2 border-transparent hover:border-purple-400 transition-colors">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-gray-600">00:30</span>
                    </div>
                  </button>
                  <button className="aspect-video bg-gray-100 rounded border-2 border-transparent hover:border-purple-400 transition-colors">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-gray-600">01:00</span>
                    </div>
                  </button>
                  <button className="aspect-video bg-gray-100 rounded border-2 border-transparent hover:border-purple-400 transition-colors">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-gray-600">01:30</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowThumbnailEdit(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setShowThumbnailEdit(false)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                <h1 className="text-2xl font-bold text-gray-900">{mockVideoData.title}</h1>
                <p className="text-sm text-gray-500 mt-1">{mockVideoData.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Dropdown de Estado */}
              <select 
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 ${getStatusStyle(currentStatus)}`}
              >
                <option value="published">Publicado</option>
                <option value="draft">Borrador</option>
                <option value="restricted">Restringido</option>
                <option value="archived">Archivado</option>
                <option value="review">En Revisión</option>
              </select>
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
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Video</h3>
                  <button 
                    onClick={() => setShowThumbnailEdit(true)}
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Editar Thumbnail
                  </button>
                </div>
                <SimpleVideoPlayer
                  src={mockVideoData.videoUrl}
                  poster={mockVideoData.thumbnail}
                  onPlay={() => console.log('Video started')}
                  onPause={() => console.log('Video paused')}
                  onEnded={() => console.log('Video ended')}
                />
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {mockVideoData.duration}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {mockVideoData.author}
                    </span>
                    <span>{mockVideoData.uploadDate}</span>
                  </div>
                  <span className="text-sm text-gray-500">{mockVideoData.size}</span>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockVideoData.categories.map((category, index) => (
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
                    {showFullTranscription ? mockVideoData.transcription : truncatedTranscription}
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
              <div className="flex space-x-2 mb-6">
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

              {/* Acciones en horizontal */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Acciones</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Compartir
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Descargar
                  </button>
                  <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm col-span-2">
                    Eliminar Video
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Disponibilidad para Clientes */}
          <div className="space-y-6">
            {/* Card de Disponibilidad que ocupa todo el espacio disponible */}
            <div className="bg-white rounded-xl shadow-sm flex flex-col" style={{ height: 'calc(100vh - 240px)' }}>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponibilidad</h3>
                
                {/* Toggle Global Video */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Video Global</p>
                    <p className="text-xs text-gray-600">Disponible para todos los clientes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGlobalVideo}
                      onChange={(e) => setIsGlobalVideo(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              {/* Contenido scrolleable */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Clientes Específicos (solo si no es global) */}
                {!isGlobalVideo && (
                  <>
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700">Clientes Específicos</h4>
                    </div>
                    
                    {/* Lista scrolleable de clientes agregados */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      <div className="space-y-3">
                        {addedClients.map((client) => (
                          <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{client.name}</p>
                            </div>
                            <button
                              onClick={() => removeClient(client.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              title="Eliminar cliente"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        
                        {addedClients.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-sm text-gray-500">No hay clientes agregados</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Botón fijo en la parte inferior */}
                    <div className="p-6 border-t border-gray-200">
                      <button 
                        onClick={() => setShowAddClientModal(true)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Agregar Cliente
                      </button>
                    </div>
                  </>
                )}

                {/* Mensaje cuando es global */}
                {isGlobalVideo && (
                  <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-purple-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">
                        Este video está disponible para <strong>todos los clientes</strong> de la plataforma
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AddClientModal />
      <ThumbnailEditModal />
    </div>
  );
}