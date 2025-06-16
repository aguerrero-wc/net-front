// components/Clientes/ClientFormView.tsx
import { useState } from "react";
import { Link, useParams } from "@remix-run/react";

export default function ClientFormView() {
  const { id } = useParams();
  const isEditing = !!id;
  
  const [sectoresSeleccionados, setSectoresSeleccionados] = useState(
    isEditing ? ["Salud"] : []
  );
  const [nuevoSector, setNuevoSector] = useState("");

  // Datos del cliente - si estamos editando carga datos existentes, si no valores por defecto
  const clienteExistente = {
    id: 1,
    nombre: "CDC - Clínica Del Country",
    tipo: "Texto",
    textoLogotipo: "",
    logo: "centro-de-control-logo1-cdc.png",
    direccion: "Cr 12 N 82 - 30",
    telefono: "5715301720",
    ciudad: "bogota",
    nit: "8980",
    numeroContrato: "12345",
    activo: true,
    nombreContacto: "Monica Jimeno",
    telefonoContacto: "2145456",
    emailContacto: "mjimeno@clinicadelcountry.com",
    correoGestionCliente: "ccaicedo@windowschannel.com",
    correoTekTeam: "tekteamcolombia@windowschannel.com, ccaicedo@windowschannel.com, msegabiu@windowschannel.com, comunicaciones@clinicadelcountry.com, webmaster",
    usuario: "usercdc",
    contraseña: "••••••",
    imagen: "centro-de-control-logo1-cdc.png",
    contenidos: 200,
    comunicados: 200,
    rss: 200,
    emailAlerta: "tekteamcolombia@windowschannel.com",
    sectores: ["Salud"]
  };

  const clienteNuevo = {
    nombre: "",
    tipo: "Texto",
    textoLogotipo: "",
    logo: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    nit: "",
    numeroContrato: "",
    activo: true,
    nombreContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    correoGestionCliente: "",
    correoTekTeam: "",
    usuario: "",
    contraseña: "",
    imagen: "",
    contenidos: 200,
    comunicados: 200,
    rss: 200,
    emailAlerta: "",
    sectores: []
  };

  const cliente = isEditing ? clienteExistente : clienteNuevo;

  const sectoresDisponibles = [
    "Automocion", "Culto", "Deportes", "Economia", "Educacion", "Entretenimiento",
    "Financiero - Banca", "Retail", "Seguros", "Servicios Publicos", "Salud"
  ];

  const agregarNuevoSector = () => {
    if (nuevoSector.trim() && !sectoresDisponibles.includes(nuevoSector.trim())) {
      sectoresDisponibles.push(nuevoSector.trim());
      setSectoresSeleccionados(prev => [...prev, nuevoSector.trim()]);
      setNuevoSector("");
    }
  };

  // Estados para manejar los destinatarios
  const [emailsNotificaciones, setEmailsNotificaciones] = useState(
    isEditing ? ["tekteamcolombia@windowschannel.com"] : []
  );
  const [emailsAlertas, setEmailsAlertas] = useState(
    isEditing ? ["alerta@ejemplo.com"] : []
  );
  const [numerosWhatsapp, setNumerosWhatsapp] = useState(
    isEditing ? ["+573001234567"] : []
  );

  const [nuevoEmailNotificacion, setNuevoEmailNotificacion] = useState("");
  const [nuevoEmailAlerta, setNuevoEmailAlerta] = useState("");
  const [nuevoNumeroWhatsapp, setNuevoNumeroWhatsapp] = useState("");

  // Funciones para agregar nuevos destinatarios
  const agregarEmailNotificacion = () => {
    if (nuevoEmailNotificacion.trim() && !emailsNotificaciones.includes(nuevoEmailNotificacion.trim())) {
      setEmailsNotificaciones(prev => [...prev, nuevoEmailNotificacion.trim()]);
      setNuevoEmailNotificacion("");
    }
  };

  const agregarEmailAlerta = () => {
    if (nuevoEmailAlerta.trim() && !emailsAlertas.includes(nuevoEmailAlerta.trim())) {
      setEmailsAlertas(prev => [...prev, nuevoEmailAlerta.trim()]);
      setNuevoEmailAlerta("");
    }
  };

  const agregarNumeroWhatsapp = () => {
    if (nuevoNumeroWhatsapp.trim() && !numerosWhatsapp.includes(nuevoNumeroWhatsapp.trim())) {
      setNumerosWhatsapp(prev => [...prev, nuevoNumeroWhatsapp.trim()]);
      setNuevoNumeroWhatsapp("");
    }
  };

  // Funciones para eliminar destinatarios
  const eliminarEmailNotificacion = (email) => {
    setEmailsNotificaciones(prev => prev.filter(e => e !== email));
  };

  const eliminarEmailAlerta = (email) => {
    setEmailsAlertas(prev => prev.filter(e => e !== email));
  };

  const eliminarNumeroWhatsapp = (numero) => {
    setNumerosWhatsapp(prev => prev.filter(n => n !== numero));
};


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

// Función para agregar nuevo contacto
const agregarContacto = () => {
  if (nuevoContacto.nombre.trim() && nuevoContacto.email.trim()) {
    const contactoConId = {
      ...nuevoContacto,
      id: Date.now(),
      // Si es el primer contacto, hacerlo principal automáticamente
      esContactoPrincipal: contactos.length === 0 ? true : nuevoContacto.esContactoPrincipal
    };

    // Si se marca como principal, quitar la marca de los demás
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

// Función para eliminar contacto
const eliminarContacto = (id) => {
  setContactos(prev => prev.filter(c => c.id !== id));
};

// Función para marcar como contacto principal
const marcarComoPrincipal = (id) => {
  setContactos(prev => prev.map(c => ({
    ...c,
    esContactoPrincipal: c.id === id
  })));
};

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <span>🏠</span>
            <Link to="/dashboard" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <Link to="/dashboard/clients" className="hover:text-gray-700">Clientes</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">
              {isEditing ? cliente.nombre : 'Nuevo Cliente'}
            </span>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/clients"
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver
            </Link>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditing ? `Editar Cliente: ${cliente.nombre}` : 'Crear Nuevo Cliente'}
          </h1>
          <p className="text-gray-600">
            {isEditing 
              ? 'Modifica la información del cliente' 
              : 'Ingresa los datos del nuevo cliente'
            }
          </p>
        </div>

        <form className="space-y-8">
          {/* Datos del Cliente */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Datos del Cliente</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.nombre}
                    required={!isEditing}
                    placeholder={!isEditing ? "Ingresa el nombre del cliente" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.direccion}
                    required={!isEditing}
                    placeholder={!isEditing ? "Dirección del cliente" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.telefono}
                    required={!isEditing}
                    placeholder={!isEditing ? "Número de teléfono" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.ciudad}
                    required={!isEditing}
                    placeholder={!isEditing ? "Ciudad" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIT {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.nit}
                    required={!isEditing}
                    placeholder={!isEditing ? "NIT del cliente" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Contrato</label>
                  <input
                    type="text"
                    defaultValue={cliente.numeroContrato}
                    placeholder={!isEditing ? "Número de contrato" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Configuracion del Sitio</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    slug {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.nombre}
                    required={!isEditing}
                    placeholder={!isEditing ? "Ingresa el nombre del cliente" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dominio {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.nombre}
                    required={!isEditing}
                    placeholder={!isEditing ? "Ingresa el nombre del cliente" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={cliente.logo}
                      placeholder={!isEditing ? "Nombre del archivo" : ""}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    >
                      Examinar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>



            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-purple-800">Contactos</h2>
      <button
        type="button"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
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
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Nuevo Contacto</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nuevoContacto.nombre}
              onChange={(e) => setNuevoContacto(prev => ({ ...prev, nombre: e.target.value }))}
              placeholder="Nombre completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input
              type="text"
              value={nuevoContacto.cargo}
              onChange={(e) => setNuevoContacto(prev => ({ ...prev, cargo: e.target.value }))}
              placeholder="Cargo o posición"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={nuevoContacto.email}
              onChange={(e) => setNuevoContacto(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={nuevoContacto.telefono}
              onChange={(e) => setNuevoContacto(prev => ({ ...prev, telefono: e.target.value }))}
              placeholder="Número de teléfono"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <select
              value={nuevoContacto.departamento}
              onChange={(e) => setNuevoContacto(prev => ({ ...prev, departamento: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Seleccionar departamento</option>
              {departamentos.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={nuevoContacto.esContactoPrincipal}
                onChange={(e) => setNuevoContacto(prev => ({ ...prev, esContactoPrincipal: e.target.checked }))}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
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
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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
          <div key={contacto.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{contacto.nombre}</h4>
                  {contacto.esContactoPrincipal && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Principal
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  {contacto.cargo && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8 0V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                      </svg>
                      <span>{contacto.cargo}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{contacto.email}</span>
                  </div>
                  
                  {contacto.telefono && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{contacto.telefono}</span>
                    </div>
                  )}
                  
                  {contacto.departamento && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                    title="Marcar como principal"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => eliminarContacto(contacto.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar contacto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-sm">No hay contactos agregados</p>
        <p className="text-xs text-gray-400 mt-1">Haz clic en "Agregar Contacto" para empezar</p>
      </div>
    )}
  </div>
</div>








          {/* Persona de Contacto */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Contacto</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.nombreContacto}
                    required={!isEditing}
                    placeholder={!isEditing ? "Nombre del contacto" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    defaultValue={cliente.telefonoContacto}
                    placeholder={!isEditing ? "Teléfono del contacto" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    defaultValue={cliente.emailContacto}
                    required={!isEditing}
                    placeholder={!isEditing ? "email@ejemplo.com" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Datos de Centro de Control */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Datos de Centro de Control</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuario {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    defaultValue={cliente.usuario}
                    required={!isEditing}
                    placeholder={!isEditing ? "Nombre de usuario" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    defaultValue={cliente.contraseña}
                    required={!isEditing}
                    placeholder={!isEditing ? "Contraseña segura" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
              </div>
            </div>
          </div>

          {/* Tiempos de Actualización */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Tiempos de Actualización</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contenidos (minutos)</label>
                  <input
                    type="number"
                    defaultValue={cliente.contenidos}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comunicados (minutos)</label>
                  <input
                    type="number"
                    defaultValue={cliente.comunicados}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RSS (minutos)</label>
                  <input
                    type="number"
                    defaultValue={cliente.rss}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Notificaciones</h2>
            </div>
            <div className="p-6 space-y-8">
              
              {/* Sección Email Notificaciones y Alertas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Email Notificaciones */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-gray-900">Email Reportes</h3>
                  </div>
                  
                  {/* Campo para agregar nuevo email */}
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={nuevoEmailNotificacion}
                      onChange={(e) => setNuevoEmailNotificacion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          agregarEmailNotificacion();
                        }
                      }}
                      placeholder="notificacion@ejemplo.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={agregarEmailNotificacion}
                      disabled={!nuevoEmailNotificacion.trim()}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  {/* Lista de emails de notificaciones */}
                  <div className="space-y-2">
                    {emailsNotificaciones.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <span className="text-sm text-blue-800">{email}</span>
                        <button
                          type="button"
                          onClick={() => eliminarEmailNotificacion(email)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {emailsNotificaciones.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No hay emails de notificación configurados</p>
                    )}
                  </div>
                </div>

                {/* Email Alertas */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-gray-900">Email Alertas</h3>
                  </div>
                  
                  {/* Campo para agregar nuevo email de alerta */}
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={agregarEmailAlerta}
                      disabled={!nuevoEmailAlerta.trim()}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  {/* Lista de emails de alertas */}
                  <div className="space-y-2">
                    {emailsAlertas.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <span className="text-sm text-red-800">{email}</span>
                        <button
                          type="button"
                          onClick={() => eliminarEmailAlerta(email)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {emailsAlertas.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No hay emails de alerta configurados</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seleccionar Sector */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Seleccionar Sector</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Campo para agregar nuevo sector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agregar Nuevo Sector</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={nuevoSector}
                      onChange={(e) => setNuevoSector(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          agregarNuevoSector();
                        }
                      }}
                      placeholder="Nombre del nuevo sector..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={agregarNuevoSector}
                      disabled={!nuevoSector.trim()}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Agregar
                    </button>
                  </div>
                </div>

                {/* Sectores disponibles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sectores {!isEditing && <span className="text-red-500">*</span>}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {sectoresDisponibles.map((sector) => {
                      const isSelected = sectoresSeleccionados.includes(sector);
                      return (
                        <button
                          key={sector}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSectoresSeleccionados(prev => prev.filter(s => s !== sector));
                            } else {
                              setSectoresSeleccionados(prev => [...prev, sector]);
                            }
                          }}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span>{sector}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Sectores seleccionados */}
                {sectoresSeleccionados.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Sectores seleccionados:</p>
                    <div className="flex flex-wrap gap-2">
                      {sectoresSeleccionados.map((sector) => (
                        <span
                          key={sector}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {sector}
                          <button
                            type="button"
                            onClick={() => setSectoresSeleccionados(prev => prev.filter(s => s !== sector))}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mensaje de validación para nuevo cliente */}
                {!isEditing && sectoresSeleccionados.length === 0 && (
                  <p className="text-red-600 text-sm">
                    * Debes seleccionar al menos un sector
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4">
            <Link
              to="/dashboard/clients"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isEditing ? 'Guardar Cliente' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}