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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    defaultValue={cliente.tipo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Texto">Texto</option>
                    <option value="Imagen">Imagen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texto Logotipo</label>
                  <input
                    type="text"
                    defaultValue={cliente.textoLogotipo}
                    placeholder={!isEditing ? "Texto del logotipo" : ""}
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

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Contrato</label>
                  <input
                    type="text"
                    defaultValue={cliente.numeroContrato}
                    placeholder={!isEditing ? "Número de contrato" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado del Cliente</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </button>
                    <span className="text-sm text-gray-600">
                      {cliente.activo ? 'Cliente activo' : 'Cliente desactivado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Persona de Contacto */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
              <h2 className="text-lg font-semibold text-purple-800">Persona de Contacto</h2>
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

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correos de Contacto con Gestión de Cliente</label>
                  <input
                    type="text"
                    defaultValue={cliente.correoGestionCliente}
                    placeholder={!isEditing ? "correo@gestion.com" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correos de Contacto con TekTeam</label>
                  <textarea
                    rows={3}
                    defaultValue={cliente.correoTekTeam}
                    placeholder={!isEditing ? "Correos separados por comas" : ""}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={cliente.imagen}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail de alerta</label>
                  <input
                    type="email"
                    defaultValue={cliente.emailAlerta}
                    placeholder={!isEditing ? "alerta@ejemplo.com" : ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
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