import { useState } from 'react';
import { Link } from '@remix-run/react';

export default function VideoUploadMain() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [] as string[],
    isGlobal: false,
    selectedClients: [] as string[],
    status: 'draft'
  });

  // Mock de clientes disponibles
  const availableClients = [
    { id: 'hsj', name: 'HSJ - Hospital de San José' },
    { id: 'cdc', name: 'CDC - Clínica Del Country' },
    { id: 'fci', name: 'FCI - Fundación CardioInfantil' },
    { id: 'hgps', name: 'HGPS - Hospital General de la Plaza' },
    { id: 'cmi', name: 'CMI - Clínica Medellín' },
    { id: 'hvl', name: 'HVL - Hospital Valle del Lili' }
  ];

  const availableCategories = [
    'Educativo',
    'Institucional', 
    'Testimonial',
    'Procedimientos',
    'Promocional',
    'Capacitación',
    'Eventos',
    'Prevención',
    'Diagnóstico',
    'Tratamiento',
    'Emergencias',
    'Nutrición'
  ];

  const [newCategory, setNewCategory] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
      // Simular upload
      setIsUploading(true);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      alert('Por favor selecciona un archivo de video válido');
    }
  };

  const handleClientToggle = (clientId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClients: prev.selectedClients.includes(clientId)
        ? prev.selectedClients.filter(id => id !== clientId)
        : [...prev.selectedClients, clientId]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category]
    }));
  };

  const addNewCategory = () => {
    if (newCategory.trim() && !availableCategories.includes(newCategory.trim()) && !formData.categories.includes(newCategory.trim())) {
      const newCat = newCategory.trim();
      availableCategories.push(newCat);
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCat]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = () => {
    console.log('Datos del video:', { ...formData, file: selectedFile });
    // Aquí iría la lógica de envío
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
                <h1 className="text-2xl font-bold text-gray-900">Subir Nuevo Video</h1>
                <p className="text-sm text-gray-500 mt-1">Agrega un nuevo video al sistema de gestión de contenidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área de Upload - Columna Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Archivo de Video</h3>
              
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 bg-gray-50'
                } ${selectedFile ? 'border-green-400 bg-green-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!selectedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-6 text-purple-500">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Selecciona tu video
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Formatos soportados: MP4, AVI, MOV, WMV<br />
                      Tamaño máximo: 500MB
                    </p>

                    <label className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Seleccionar Archivo
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 text-green-500">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedFile.name}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    
                    {isUploading && (
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Subiendo...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {uploadProgress === 100 && !isUploading && (
                      <p className="text-green-600 font-medium">¡Video subido exitosamente!</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Información del Video */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Información del Video</h3>
              
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Título del Video *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: HSJ - ¿Qué pasa con la sangre que dono?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Descripción
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe brevemente el contenido del video..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  />
                </div> */}

                {/* Categoría y Estado */}
                {/* <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Estado Inicial
                    </label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Borrador</option>
                      <option value="review">En Revisión</option>
                      <option value="published">Publicado</option>
                    </select>
                  </div>
                </div> */}

                {/* Categorías */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Categorías
                  </label>
                  
                  {/* Categorías seleccionadas */}
                  {formData.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      {formData.categories.map((category) => (
                        <span 
                          key={category}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center group"
                        >
                          {category}
                          <button 
                            onClick={() => removeCategory(category)}
                            className="ml-2 text-purple-600 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Grid de categorías disponibles */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {availableCategories.filter(cat => !formData.categories.includes(cat)).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryToggle(category)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  
                  {/* Agregar nueva categoría */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addNewCategory()}
                      placeholder="Agregar nueva categoría..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                    <button 
                      type="button"
                      onClick={addNewCategory}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Disponibilidad */}
          <div className="space-y-6">
            {/* Disponibilidad */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponibilidad</h3>
              
              {/* Toggle Global */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Video Global</p>
                  <p className="text-xs text-gray-600">Disponible para todos los clientes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isGlobal}
                    onChange={(e) => setFormData(prev => ({ ...prev, isGlobal: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Clientes Específicos */}
              {!formData.isGlobal && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Clientes Específicos</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableClients.map((client) => (
                      <label key={client.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.selectedClients.includes(client.id)}
                          onChange={() => handleClientToggle(client.id)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{client.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {formData.isGlobal && (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-purple-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Este video estará disponible para <strong>todos los clientes</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Información Automática */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Se Generará Automáticamente
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Transcripción (IA)
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Palabras Clave
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Descripcion del video
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Categorias sugeridas
                </li>
                <li className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Idioma del video
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 Después del análisis podrás revisar y confirmar toda la información generada automáticamente
                </p>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3">
              <button 
                onClick={handleSubmit}
                disabled={!selectedFile || !formData.title}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Procesar Video
              </button>
              <Link 
                to="/videos"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors text-center block"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}