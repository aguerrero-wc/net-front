// routes/dashboard.clients.$id.tsx (or routes/dashboard.clients.new.tsx)
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import type { Cliente, LoaderData } from "~/types/cliente";

// Importamos todos los componentes desde el index
import {
  ClientDataCard,
  SiteConfigCard,
  ContactCard,
  ControlCenterCard,
  UpdateTimesCard,
  NotificationsCard,
  SectorsCard
} from "~/components/Clients";

// Loader que se ejecuta en el servidor
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const isEditing = !!id && id !== "new";

  // Datos mock - aquí harías la llamada a tu API
  const clienteExistente: Cliente = {
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
    correoTekTeam: "tekteamcolombia@windowschannel.com, ccaicedo@windowschannel.com",
    usuario: "usercdc",
    contraseña: "••••••",
    imagen: "centro-de-control-logo1-cdc.png",
    contenidos: 200,
    comunicados: 200,
    rss: 200,
    emailAlerta: "tekteamcolombia@windowschannel.com",
    sectores: ["Salud"],
    slug: "cdc-clinica-del-country",
    dominio: "cdc.ejemplo.com"
  };

  const clienteNuevo: Cliente = {
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
    sectores: [],
    slug: "",
    dominio: ""
  };

  // En producción, aquí harías:
  // if (isEditing) {
  //   const response = await fetch(`${API_URL}/clientes/${id}`);
  //   cliente = await response.json();
  // }

  const cliente = isEditing ? clienteExistente : clienteNuevo;

  return json<LoaderData>({
    cliente,
    isEditing
  });
}

export default function ClientFormView() {
  const { cliente, isEditing } = useLoaderData<typeof loader>();

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
            <button 
              type="submit" 
              form="client-form"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
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

        <form id="client-form" className="space-y-8" method="post">
          {/* Datos del Cliente */}
          <ClientDataCard cliente={cliente} isEditing={isEditing} />

          {/* Configuración del Sitio */}
          <SiteConfigCard cliente={cliente} isEditing={isEditing} />

          {/* Contactos */}
          <ContactCard cliente={cliente} isEditing={isEditing} />

          {/* Datos de Centro de Control */}
          <ControlCenterCard cliente={cliente} isEditing={isEditing} />

          {/* Tiempos de Actualización */}
          <UpdateTimesCard cliente={cliente} isEditing={isEditing} />

          {/* Notificaciones */}
          <NotificationsCard cliente={cliente} isEditing={isEditing} />

          {/* Sectores */}
          <SectorsCard cliente={cliente} isEditing={isEditing} />

          {/* Botones de acción del formulario */}
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

// Action para manejar el envío del formulario
export async function action({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const { id } = params;
  const isEditing = !!id && id !== "new";

  // Construir objeto cliente desde formData
  const clienteData = {
    // Datos básicos del cliente
    nombre: formData.get("nombre") as string,
    direccion: formData.get("direccion") as string,
    telefono: formData.get("telefono") as string,
    ciudad: formData.get("ciudad") as string,
    nit: formData.get("nit") as string,
    numeroContrato: formData.get("numeroContrato") as string,
    
    // Configuración del sitio
    slug: formData.get("slug") as string,
    dominio: formData.get("dominio") as string,
    logo: formData.get("logo") as string,
    tipo: formData.get("tipo") as "Texto" | "Imagen",
    textoLogotipo: formData.get("textoLogotipo") as string,
    
    // Contacto
    nombreContacto: formData.get("nombreContacto") as string,
    telefonoContacto: formData.get("telefonoContacto") as string,
    emailContacto: formData.get("emailContacto") as string,
    
    // Centro de control
    usuario: formData.get("usuario") as string,
    contraseña: formData.get("contraseña") as string,
    activo: formData.get("activo") === "true",
    correoGestionCliente: formData.get("correoGestionCliente") as string,
    correoTekTeam: formData.get("correoTekTeam") as string,
    
    // Tiempos de actualización
    contenidos: parseInt(formData.get("contenidos") as string) || 200,
    comunicados: parseInt(formData.get("comunicados") as string) || 200,
    rss: parseInt(formData.get("rss") as string) || 200,
    
    // Notificaciones (arrays)
    emailsNotificaciones: formData.getAll("emailsNotificaciones") as string[],
    emailsAlertas: formData.getAll("emailsAlertas") as string[],
    numerosWhatsapp: formData.getAll("numerosWhatsapp") as string[],
    
    // Sectores
    sectores: formData.getAll("sectores") as string[],
  };

  if (isEditing) {
    // Actualizar cliente existente
    // await fetch(`${API_URL}/clientes/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(clienteData),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    console.log("Actualizando cliente:", clienteData);
  } else {
    // Crear nuevo cliente
    // await fetch(`${API_URL}/clientes`, {
    //   method: 'POST',
    //   body: JSON.stringify(clienteData),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    console.log("Creando cliente:", clienteData);
  }

  // Redirigir a la lista de clientes
  return redirect("/dashboard/clients");
}