// components/Clientes/ClientFormView.tsx
import { useState } from "react";
import { Link, useParams } from "@remix-run/react";

export default function ClientFormView() {
  const { id } = useParams();
  const isEditing = !!id;

  // Estados para contactos
  const [contactos, setContactos] = useState(
    isEditing ? [
      {
        id: 1,
        nombre: "Monica Jimeno",
        cargo: "Gerente de Marketing",
        telefono: "2145456",
        email: "mjimeno@clinicadelcountry.com",
        esContactoPrincipal: true,
        departamento: "Marketing"
      }
    ] : []
  );

  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    cargo: "",
    telefono: "",
    email: "",
    esContactoPrincipal: false,
    departamento: ""
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const departamentos = [
    "Gerencia General",
    "Marketing",
    "Comunicaciones", 
    "IT/Sistemas",
    "Administración",
    "Recursos Humanos",
    "Ventas",
    "Operaciones",
    "Otro"
  ];

  // Estados para notificaciones
  const [emailsReportes, setEmailsReportes] = useState(
    isEditing ? ["tekteamcolombia@windowschannel.com"] : []
  );
  const [emailsAlertas, setEmailsAlertas] = useState(
    isEditing ? ["alerta@ejemplo.com"] : []
  );
  const [nuevoEmailReporte, setNuevoEmailReporte] = useState("");
  const [nuevoEmailAlerta, setNuevoEmailAlerta] = useState("");

  // Estados para servicios externos
  const [servicios, setServicios] = useState(
    isEditing ? [
      {
        id: 1,
        serviceType: "AWS S3",
        isActive: true,
        credentials: { accessKey: "****", secretKey: "****" }
      }
    ] : []
  );
  const [mostrarFormularioServicio, setMostrarFormularioServicio] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    serviceType: "",
    isActive: true,
    credentials: {}
  });

  const tiposServicio = [
    "Meta (Facebook/Instagram)",
    "AWS S3",
    "Digital Ocean Spaces",
    "Vimeo",
    "YouTube API",
    "Cloudinary",
    "SendGrid",
    "Twilio",
    "Stripe",
    "PayPal"
  ];

  // Funciones para contactos
  const agregarContacto = () => {
    if (nuevoContacto.nombre.trim() && nuevoContacto.email.trim()) {
      const contactoConId = {
        ...nuevoContacto,
        id: Date.now(),
        esContactoPrincipal: contactos.length === 0 ? true : nuevoContacto.esContactoPrincipal
      };

      if (contactoConId.esContactoPrincipal) {
        setContactos(prev => prev.map(c => ({ ...c, esContactoPrincipal: false })));
      }

      setContactos(prev => [...prev, contactoConId]);
      setNuevoContacto({
        nombre: "",
        cargo: "",
        telefono: "",
        email: "",
        esContactoPrincipal: false,
        departamento: ""
      });
      setMostrarFormulario(false);
    }
  };

  const eliminarContacto = (id) => {
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  const marcarComoPrincipal = (id) => {
    setContactos(prev => prev.map(c => ({
      ...c,
      esContactoPrincipal: c.id === id
    })));
  };

  // Funciones para notificaciones
  const agregarEmailReporte = () => {
    if (nuevoEmailReporte.trim() && !emailsReportes.includes(nuevoEmailReporte.trim())) {
      setEmailsReportes(prev => [...prev, nuevoEmailReporte.trim()]);
      setNuevoEmailReporte("");
    }
  };

  const agregarEmailAlerta = () => {
    if (nuevoEmailAlerta.trim() && !emailsAlertas.includes(nuevoEmailAlerta.trim())) {
      setEmailsAlertas(prev => [...prev, nuevoEmailAlerta.trim()]);
      setNuevoEmailAlerta("");
    }
  };

  const eliminarEmailReporte = (email) => {
    setEmailsReportes(prev => prev.filter(e => e !== email));
  };

  const eliminarEmailAlerta = (email) => {
    setEmailsAlertas(prev => prev.filter(e => e !== email));
  };

  // Funciones para servicios
  const agregarServicio = () => {
    if (nuevoServicio.serviceType.trim()) {
      const servicioConId = {
        ...nuevoServicio,
        id: Date.now()
      };
      setServicios(prev => [...prev, servicioConId]);
      setNuevoServicio({
        serviceType: "",
        isActive: true,
        credentials: {}
      });
      setMostrarFormularioServicio(false);
    }
  };

  const eliminarServicio = (id) => {
    setServicios(prev => prev.filter(s => s.id !== id));
  };

  const toggleServicioActivo = (id) => {
    setServicios(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-orange-50 via-sky-50 to-emerald-50 min-h-screen relative overflow-hidden">
      {/* Elementos decorativos de fondo con los 3 colores */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6600D] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header con glassmorphism */}
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/50 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#E6600D] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
              <span className="text-gray-400">›</span>
              <Link to="/dashboard/clients" className="text-gray-600 hover:text-[#E6600D] transition-colors">
                Clientes
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">
                {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
              </span>
            </nav>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/clients"
                className="px-5 py-2.5 text-gray-700 backdrop-blur-sm bg-white/60 border border-gray-200/50 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all hover:scale-105 active:scale-95 font-medium"
              >
                Volver
              </Link>
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-semibold">
                {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto relative z-10">
        {/* Título */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing 
                ? 'Modifica la información del cliente' 
                : 'Ingresa los datos del nuevo cliente'
              }
            </p>
          </div>
        </div>

        <form className="space-y-6">
          {/* 1. INFORMACIÓN BÁSICA - NARANJA */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#E6600D]/10 to-[#FF7A2F]/10 border-b border-orange-200/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-xl shadow-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Información Básica</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Tenant <span className="text-[#E6600D]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="CDC - Clínica Del Country"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-[#E6600D]">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="cdc-clinica"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL amigable (sin espacios ni caracteres especiales)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dominio
                  </label>
                  <input
                    type="text"
                    name="domain"
                    placeholder="www.clinicadelcountry.com"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Descripción breve del cliente..."
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      defaultChecked
                      className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D]"
                    />
                    <span className="text-sm text-gray-700">Cliente Activo</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="logo"
                      placeholder="logo.png"
                      className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="favicon"
                      placeholder="favicon.ico"
                      className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de Contacto <span className="text-[#E6600D]">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    placeholder="contacto@ejemplo.com"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    placeholder="+57 300 123 4567"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* 3. CONTACTOS - VERDE */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-b border-emerald-200/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Contactos del Cliente</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(!mostrarFormulario)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar Contacto
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Formulario para nuevo contacto */}
              {mostrarFormulario && (
                <div className="backdrop-blur-sm bg-emerald-50/60 border border-emerald-200/50 rounded-2xl p-6 mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Nuevo Contacto
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre <span className="text-[#E6600D]">*</span>
                      </label>
                      <input
                        type="text"
                        value={nuevoContacto.nombre}
                        onChange={(e) => setNuevoContacto(prev => ({ ...prev, nombre: e.target.value }))}
                        placeholder="Nombre completo"
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                      <input
                        type="text"
                        value={nuevoContacto.cargo}
                        onChange={(e) => setNuevoContacto(prev => ({ ...prev, cargo: e.target.value }))}
                        placeholder="Cargo o posición"
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-[#E6600D]">*</span>
                      </label>
                      <input
                        type="email"
                        value={nuevoContacto.email}
                        onChange={(e) => setNuevoContacto(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@ejemplo.com"
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        value={nuevoContacto.telefono}
                        onChange={(e) => setNuevoContacto(prev => ({ ...prev, telefono: e.target.value }))}
                        placeholder="Número de teléfono"
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                      <select
                        value={nuevoContacto.departamento}
                        onChange={(e) => setNuevoContacto(prev => ({ ...prev, departamento: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      >
                        <option value="">Seleccionar departamento</option>
                        {departamentos.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={nuevoContacto.esContactoPrincipal}
                          onChange={(e) => setNuevoContacto(prev => ({ ...prev, esContactoPrincipal: e.target.checked }))}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        Contacto Principal
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={agregarContacto}
                      disabled={!nuevoContacto.nombre.trim() || !nuevoContacto.email.trim()}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Guardar Contacto
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarFormulario(false);
                        setNuevoContacto({
                          nombre: "",
                          cargo: "",
                          telefono: "",
                          email: "",
                          esContactoPrincipal: false,
                          departamento: ""
                        });
                      }}
                      className="px-5 py-2.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 text-gray-700 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95 text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Lista de contactos existentes */}
              {contactos.length > 0 ? (
                <div className="space-y-4">
                  {contactos.map((contacto) => (
                    <div key={contacto.id} className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-5 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {contacto.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{contacto.nombre}</h4>
                              {contacto.esContactoPrincipal && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 border border-emerald-500/20">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  Principal
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                            {contacto.cargo && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8 0V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                                </svg>
                                <span>{contacto.cargo}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>{contacto.email}</span>
                            </div>
                            
                            {contacto.telefono && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{contacto.telefono}</span>
                              </div>
                            )}
                            
                            {contacto.departamento && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
                                </svg>
                                <span>{contacto.departamento}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {!contacto.esContactoPrincipal && (
                            <button
                              type="button"
                              onClick={() => marcarComoPrincipal(contacto.id)}
                              className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-xl hover:bg-emerald-50"
                              title="Marcar como principal"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => eliminarContacto(contacto.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                            title="Eliminar contacto"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No hay contactos agregados</p>
                  <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Contacto" para empezar</p>
                </div>
              )}
            </div>
          </div>

          {/* 6. NOTIFICACIONES POR EMAIL - AZUL/ROJO */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-b border-indigo-200/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Configuración de Email</h2>
              </div>
            </div>
            <div className="p-6">
              {/* Configuración de Email */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Remitente de Emails</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Remitente</label>
                    <input
                      type="text"
                      name="emailFromName"
                      placeholder="Windows Channel"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email del Remitente</label>
                    <input
                      type="email"
                      name="emailFromAddress"
                      placeholder="noreply@windowschannel.com"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Destinatarios de Notificaciones */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Email Reportes */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Email Reportes</h3>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={nuevoEmailReporte}
                        onChange={(e) => setNuevoEmailReporte(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            agregarEmailReporte();
                          }
                        }}
                        placeholder="reporte@ejemplo.com"
                        className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={agregarEmailReporte}
                        disabled={!nuevoEmailReporte.trim()}
                        className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {emailsReportes.map((email, index) => (
                        <div key={index} className="flex items-center justify-between backdrop-blur-sm bg-blue-50/80 border border-blue-200/50 rounded-2xl px-4 py-3 hover:shadow-md transition-all">
                          <span className="text-sm text-blue-900 font-medium">{email}</span>
                          <button
                            type="button"
                            onClick={() => eliminarEmailReporte(email)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-lg hover:bg-blue-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {emailsReportes.length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-4">No hay emails de reporte configurados</p>
                      )}
                    </div>
                  </div>

                  {/* Email Alertas */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Email Alertas</h3>
                    </div>
                    
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
                        className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={agregarEmailAlerta}
                        disabled={!nuevoEmailAlerta.trim()}
                        className="px-4 py-3 bg-red-600 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {emailsAlertas.map((email, index) => (
                        <div key={index} className="flex items-center justify-between backdrop-blur-sm bg-red-50/80 border border-red-200/50 rounded-2xl px-4 py-3 hover:shadow-md transition-all">
                          <span className="text-sm text-red-900 font-medium">{email}</span>
                          <button
                            type="button"
                            onClick={() => eliminarEmailAlerta(email)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-lg hover:bg-red-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {emailsAlertas.length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-4">No hay emails de alerta configurados</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. SERVICIOS EXTERNOS - AMARILLO/AMBER */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-b border-amber-200/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl shadow-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Servicios Externos</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarFormularioServicio(!mostrarFormularioServicio)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar Servicio
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Formulario para nuevo servicio */}
              {mostrarFormularioServicio && (
                <div className="backdrop-blur-sm bg-amber-50/60 border border-amber-200/50 rounded-2xl p-6 mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva Integración
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Servicio <span className="text-[#E6600D]">*</span>
                      </label>
                      <select
                        value={nuevoServicio.serviceType}
                        onChange={(e) => setNuevoServicio(prev => ({ ...prev, serviceType: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                      >
                        <option value="">Seleccionar servicio</option>
                        {tiposServicio.map(tipo => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={nuevoServicio.isActive}
                          onChange={(e) => setNuevoServicio(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        />
                        Servicio Activo
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={agregarServicio}
                      disabled={!nuevoServicio.serviceType.trim()}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Guardar Servicio
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarFormularioServicio(false);
                        setNuevoServicio({
                          serviceType: "",
                          isActive: true,
                          credentials: {}
                        });
                      }}
                      className="px-5 py-2.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 text-gray-700 rounded-2xl hover:bg-white/80 transition-all hover:scale-105 active:scale-95 text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Lista de servicios */}
              {servicios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicios.map((servicio) => (
                    <div key={servicio.id} className="backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-2xl p-5 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{servicio.serviceType}</h4>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              servicio.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {servicio.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleServicioActivo(servicio.id)}
                            className="p-2 text-gray-400 hover:text-amber-600 transition-colors rounded-xl hover:bg-amber-50"
                            title={servicio.isActive ? "Desactivar" : "Activar"}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => eliminarServicio(servicio.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                            title="Eliminar servicio"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Credenciales configuradas</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No hay servicios configurados</p>
                  <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Servicio" para empezar</p>
                </div>
              )}
            </div>
          </div>


                    {/* 2. CONFIGURACIÓN DE TEMA Y UI - AZUL */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 border-b border-sky-200/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Configuración de Tema y UI</h2>
              </div>
            </div>
            <div className="p-6">
              {/* Colores del Tema */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Colores del Tema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="primaryColor"
                        defaultValue="#3B82F6"
                        className="w-16 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#3B82F6"
                        className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="secondaryColor"
                        defaultValue="#10B981"
                        className="w-16 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#10B981"
                        className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color de Acento</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="accentColor"
                        defaultValue="#EF4444"
                        className="w-16 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#EF4444"
                        className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferencias de UI */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Preferencias de Interfaz</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                    <select
                      name="theme"
                      defaultValue="light"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Elementos de Layout */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Elementos de Layout</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sidebarEnabled"
                      defaultChecked
                      className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                    />
                    Sidebar
                  </label>
                </div>
              </div>

              {/* Configuración Regional */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Configuración Regional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                    <select
                      name="timezone"
                      defaultValue="America/Bogota"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                    >
                      <option value="America/Bogota">Bogotá (UTC-5)</option>
                      <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
                      <option value="America/New_York">Nueva York (UTC-5)</option>
                      <option value="Europe/Madrid">Madrid (UTC+1)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                    <select
                      name="defaultLanguage"
                      defaultValue="es"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="pt">Português</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción finales */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/dashboard/clients"
              className="px-8 py-3.5 backdrop-blur-sm bg-white/60 border border-gray-200/50 text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all hover:scale-105 active:scale-95 font-semibold"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-bold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? 'Guardar Cliente' : 'Crear Cliente'}
            </button>
          </div>
        </form>
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