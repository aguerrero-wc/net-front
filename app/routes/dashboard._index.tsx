import { useState } from 'react';
import { Link } from '@remix-run/react';

// Mock data para canales
const mockChannelData = {
  id: 'cdc-channel',
  name: 'CDC - Clínica Del Country',
  type: 'Imagen',
  logo: 'https://via.placeholder.com/150x100/E6600D/FFFFFF?text=CDC+Logo',
  decoration: 'https://via.placeholder.com/150x100/E6600D/FFFFFF?text=Decoration',
  rssMain: {
    active: true,
    url: 'http://www.eltiempo.com/rss/cine-y-tv.xml'
  },
  rssSecondary: {
    active: true,
    url: 'http://www.eltiempo.com/rss/entretenimiento.xml'
  },
  rssMainColor: '#FFFFFF',
  rssSecondaryColor: '#FFFFFF',
  streaming: {
    active: false,
    url: '',
    duration: 0
  },
  observations: '',
  contentDownload: {
    blocked: false,
    hours: {
      start: '--:--',
      end: '--:--'
    }
  },
  selectedWinboxes: [
    'CDC - Clínica Del Country (Monitoreo)',
    'INDC - Instituto Nacional Cancer Informa (Administración)',
    'LCB - Los Cobos (Cobos Prueba)'
  ],
  availableWinboxes: [
    'CDC - Clínica Del Country (Cr 16 7 Piso)',
    'CDC - Clínica Del Country (sin uso 3)',
    'CDC - Clínica Del Country (Sin uso 2)',
    'CDC - Clínica Del Country (Calle 123)',
    'CDC - Clínica Del Country (Cr 16 Sótano)',
    'CDC - Clínica Del Country (Oncología)',
    'CDC - Clínica Del Country (Oficina Comunicación)',
    'CDC - Clínica Del Country (Cr 15)',
    'CMI - Imbanaco (Torre 6)'
  ]
};

export default function ChannelManagement() {
  const [activeTab, setActiveTab] = useState('canal');
  const [channelData, setChannelData] = useState(mockChannelData);
  const [showWinboxModal, setShowWinboxModal] = useState(false);

  const tabs = [
    { id: 'canal', label: 'Canal', icon: '📺' },
    { id: 'banners', label: 'Banners', icon: '🎨' },
    { id: 'programacion', label: 'Programación', icon: '📅' }
  ];

  const channelTypes = [
    'Imagen',
    'Video',
    'Stream',
    'Mixto'
  ];

  const handleInputChange = (field: string, value: any, nested?: string) => {
    if (nested) {
      setChannelData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [nested]: value
        }
      }));
    } else {
      setChannelData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addWinbox = (winbox: string) => {
    setChannelData(prev => ({
      ...prev,
      selectedWinboxes: [...prev.selectedWinboxes, winbox],
      availableWinboxes: prev.availableWinboxes.filter(w => w !== winbox)
    }));
    setShowWinboxModal(false);
  };

  const removeWinbox = (winbox: string) => {
    setChannelData(prev => ({
      ...prev,
      selectedWinboxes: prev.selectedWinboxes.filter(w => w !== winbox),
      availableWinboxes: [...prev.availableWinboxes, winbox]
    }));
  };

  // Modal para agregar Winbox
  const WinboxModal = () => {
    if (!showWinboxModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl max-w-md w-full mx-4 max-h-96 flex flex-col border border-white/50">
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900">Seleccionar Winbox</h3>
            <button 
              onClick={() => setShowWinboxModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {channelData.availableWinboxes.map((winbox, index) => (
                <button
                  key={index}
                  onClick={() => addWinbox(winbox)}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/60 backdrop-blur-sm transition-all border border-gray-200/50 hover:border-[#E6600D]/50 hover:scale-[1.02]"
                >
                  <div className="text-sm font-medium text-gray-900">{winbox}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCanalTab = () => (
    <div className="space-y-6">
      {/* Información Básica */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Información del Canal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nombre del Canal
            </label>
            <input
              type="text"
              value={channelData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Tipo
            </label>
            <select 
              value={channelData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            >
              {channelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Imágenes del Canal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Logo 
              <span className="inline-flex items-center ml-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg className="w-4 h-4 text-red-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.704-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </span>
            </label>
            <div className="border-2 border-dashed border-gray-300/50 rounded-2xl p-6 text-center hover:border-[#E6600D]/50 transition-colors bg-white/30 backdrop-blur-sm">
              <div className="mb-4">
                <img 
                  src={channelData.logo} 
                  alt="Logo" 
                  className="mx-auto h-24 object-contain rounded-lg"
                />
              </div>
              <button className="text-sm text-[#E6600D] hover:text-[#CC5509] font-medium">
                Cambiar Logo
              </button>
            </div>
          </div>

          {/* Decoration */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Decoración
              <span className="inline-flex items-center ml-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg className="w-4 h-4 text-red-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.704-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </span>
            </label>
            <div className="border-2 border-dashed border-gray-300/50 rounded-2xl p-6 text-center hover:border-[#E6600D]/50 transition-colors bg-white/30 backdrop-blur-sm">
              <div className="mb-4">
                <img 
                  src={channelData.decoration} 
                  alt="Decoration" 
                  className="mx-auto h-24 object-contain rounded-lg"
                />
              </div>
              <button className="text-sm text-[#E6600D] hover:text-[#CC5509] font-medium">
                Cambiar Decoración
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RSS Configuration */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuración RSS</h3>
        
        <div className="space-y-6">
          {/* RSS Principal */}
          <div className="space-y-4">
            <div className="flex items-center mb-3">
              <input 
                type="checkbox" 
                checked={channelData.rssMain.active}
                onChange={(e) => handleInputChange('rssMain', e.target.checked, 'active')}
                className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D] mr-3"
              />
              <label className="text-sm font-medium text-gray-900">RSS Principal Activo</label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">URL RSS Principal</label>
                <input
                  type="url"
                  value={channelData.rssMain.url}
                  onChange={(e) => handleInputChange('rssMain', e.target.value, 'url')}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-sm"
                  disabled={!channelData.rssMain.active}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Color RSS Principal</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={channelData.rssMainColor}
                    onChange={(e) => handleInputChange('rssMainColor', e.target.value)}
                    className="w-12 h-12 rounded-xl cursor-pointer border border-gray-200/50"
                    disabled={!channelData.rssMain.active}
                  />
                  <input
                    type="text"
                    value={channelData.rssMainColor}
                    onChange={(e) => handleInputChange('rssMainColor', e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-sm"
                    disabled={!channelData.rssMain.active}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RSS Secundario */}
          <div className="space-y-4 pt-6 border-t border-gray-200/50">
            <div className="flex items-center mb-3">
              <input 
                type="checkbox" 
                checked={channelData.rssSecondary.active}
                onChange={(e) => handleInputChange('rssSecondary', e.target.checked, 'active')}
                className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D] mr-3"
              />
              <label className="text-sm font-medium text-gray-900">RSS Secundario Activo</label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">URL RSS Secundario</label>
                <input
                  type="url"
                  value={channelData.rssSecondary.url}
                  onChange={(e) => handleInputChange('rssSecondary', e.target.value, 'url')}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-sm"
                  disabled={!channelData.rssSecondary.active}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Color RSS Secundario</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={channelData.rssSecondaryColor}
                    onChange={(e) => handleInputChange('rssSecondaryColor', e.target.value)}
                    className="w-12 h-12 rounded-xl cursor-pointer border border-gray-200/50"
                    disabled={!channelData.rssSecondary.active}
                  />
                  <input
                    type="text"
                    value={channelData.rssSecondaryColor}
                    onChange={(e) => handleInputChange('rssSecondaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all text-sm"
                    disabled={!channelData.rssSecondary.active}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streaming */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Streaming</h3>
        
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              checked={channelData.streaming.active}
              onChange={(e) => handleInputChange('streaming', e.target.checked, 'active')}
              className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D] mr-3"
            />
            <label className="text-sm font-medium text-gray-900">Streaming Activo</label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">URL Streaming</label>
              <input
                type="url"
                value={channelData.streaming.url}
                onChange={(e) => handleInputChange('streaming', e.target.value, 'url')}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                disabled={!channelData.streaming.active}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Duración (segundos)</label>
              <input
                type="number"
                value={channelData.streaming.duration}
                onChange={(e) => handleInputChange('streaming', parseInt(e.target.value), 'duration')}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                disabled={!channelData.streaming.active}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Observaciones</h3>
        <textarea
          value={channelData.observations}
          onChange={(e) => handleInputChange('observations', e.target.value)}
          rows={4}
          placeholder="Añade observaciones sobre el canal..."
          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Bloquear Descarga */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Bloquear Descarga de Contenidos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-3">
              <input 
                type="checkbox" 
                checked={channelData.contentDownload.blocked}
                onChange={(e) => handleInputChange('contentDownload', e.target.checked, 'blocked')}
                className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D] mr-3"
              />
              <label className="text-sm font-medium text-gray-900">Bloquear descargas</label>
            </div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Desde</label>
            <input
              type="time"
              value={channelData.contentDownload.hours.start}
              onChange={(e) => handleInputChange('contentDownload', { ...channelData.contentDownload.hours, start: e.target.value }, 'hours')}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2 mt-8">
              Hasta
            </label>
            <input
              type="time"
              value={channelData.contentDownload.hours.end}
              onChange={(e) => handleInputChange('contentDownload', { ...channelData.contentDownload.hours, end: e.target.value }, 'hours')}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Winboxes */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Gestión de Winboxes</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Winboxes Seleccionados */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Winboxes Seleccionados</h4>
            <div className="border border-gray-300/50 rounded-2xl p-4 h-48 overflow-y-auto bg-white/30 backdrop-blur-sm">
              {channelData.selectedWinboxes.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No hay winboxes seleccionados</p>
              ) : (
                <div className="space-y-2">
                  {channelData.selectedWinboxes.map((winbox, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                      <span className="text-sm text-gray-700 flex-1">{winbox}</span>
                      <button
                        onClick={() => removeWinbox(winbox)}
                        className="text-[#E6600D] hover:text-[#CC5509] p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setShowWinboxModal(true)}
              className="w-full mt-4 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white px-4 py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              + Agregar Winbox
            </button>
          </div>

          {/* Disponibles para seleccionar */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Disponibles para Seleccionar</h4>
            <div className="border border-gray-300/50 rounded-2xl p-4 h-48 overflow-y-auto bg-white/30 backdrop-blur-sm">
              {channelData.availableWinboxes.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">Todos los winboxes están seleccionados</p>
              ) : (
                <div className="space-y-2">
                  {channelData.availableWinboxes.map((winbox, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-white/40 rounded-xl transition-colors">
                      <span className="text-sm text-gray-700 flex-1">{winbox}</span>
                      <button
                        onClick={() => addWinbox(winbox)}
                        className="text-[#E6600D] hover:text-[#CC5509] p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBannersTab = () => (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión de Banners</h3>
        <p className="text-gray-600">
          Aquí podrás gestionar los banners publicitarios del canal
        </p>
      </div>
    </div>
  );

  const renderProgramacionTab = () => (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-lg border border-white/50 p-6">
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Programación del Canal</h3>
        <p className="text-gray-600">
          Aquí podrás gestionar la programación y horarios del canal
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50">
      {/* Main Content - Sin sidebar aquí, se usa el componente Sidebar separado */}
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/50 border-b border-white/50">
          <div className="px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard/channels" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{channelData.name}</h1>
                  <p className="text-sm text-gray-500 mt-1">Gestión y configuración del canal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all hover:scale-[1.02] font-medium">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="backdrop-blur-xl bg-white/50 border-b border-white/50">
          <div className="px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#E6600D] text-[#E6600D]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {activeTab === 'canal' && renderCanalTab()}
          {activeTab === 'banners' && renderBannersTab()}
          {activeTab === 'programacion' && renderProgramacionTab()}
        </div>
      </div>

      {/* Modal */}
      <WinboxModal />
    </div>
  );
}