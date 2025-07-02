// routes/dashboard.clients.$id.tsx (or routes/dashboard.clients.new.tsx)
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import type { Cliente, LoaderData } from "~/types/client";

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
    dominio: "cdc.ejemplo.com",
    contactos: [
      {
        id: 1,
        nombre: "Monica Jimeno",
        cargo: "Gerente de Marketing",
        telefono: "2145456",
        email: "mjimeno@clinicadelcountry.com",
        esContactoPrincipal: true,
        departamento: "Marketing"
      },
      {
        id: 2,
        nombre: "Carlos Rodriguez",
        cargo: "Director Comunicaciones",
        telefono: "3001234567",
        email: "crodriguez@clinicadelcountry.com",
        esContactoPrincipal: false,
        departamento: "Comunicaciones"
      }
    ],
    usuarios: [
      {
        id: 1,
        nombre: "Carlos Admin",
        email: "admin@clinicadelcountry.com",
        usuario: "cadmin",
        rol: "admin",
        estado: "activo",
        fechaCreacion: "2024-01-15",
        ultimoAcceso: "2024-06-15",
        permisos: {
          contenidos: true,
          comunicados: true,
          usuarios: true,
          configuracion: true,
          reportes: true
        },
        requiereCambioContrasena: false,
        fechaUltimoCambioContrasena: "2024-03-15"
      },
      {
        id: 2,
        nombre: "Ana Editor",
        email: "editor@clinicadelcountry.com",
        usuario: "aeditor",
        rol: "editor",
        estado: "activo",
        fechaCreacion: "2024-02-01",
        ultimoAcceso: "2024-06-14",
        permisos: {
          contenidos: true,
          comunicados: true,
          usuarios: false,
          configuracion: false,
          reportes: true
        },
        requiereCambioContrasena: false,
        fechaUltimoCambioContrasena: "2024-04-01"
      },
      {
        id: 3,
        nombre: "Luis Viewer",
        email: "viewer@clinicadelcountry.com",
        usuario: "lviewer",
        rol: "viewer",
        estado: "inactivo",
        fechaCreacion: "2024-03-10",
        permisos: {
          contenidos: false,
          comunicados: false,
          usuarios: false,
          configuracion: false,
          reportes: true
        },
        requiereCambioContrasena: true
      }
    ]
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
    dominio: "",
    contactos: [],
    usuarios: []
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

  // Procesar contactos desde FormData
  const contactos = [];
  const formEntries = Array.from(formData.entries());
  
  // Buscar todos los índices de contactos
  const contactoIndices = new Set<number>();
  formEntries.forEach(([key]) => {
    const match = key.match(/^contactos\[(\d+)\]/);
    if (match) {
      contactoIndices.add(parseInt(match[1]));
    }
  });

  // Construir array de contactos
  contactoIndices.forEach(index => {
    const contacto = {
      id: parseInt(formData.get(`contactos[${index}][id]`) as string),
      nombre: formData.get(`contactos[${index}][nombre]`) as string,
      cargo: formData.get(`contactos[${index}][cargo]`) as string,
      telefono: formData.get(`contactos[${index}][telefono]`) as string,
      email: formData.get(`contactos[${index}][email]`) as string,
      esContactoPrincipal: formData.get(`contactos[${index}][esContactoPrincipal]`) === "true",
      departamento: formData.get(`contactos[${index}][departamento]`) as string,
    };
    contactos.push(contacto);
  });

  // Procesar usuarios desde FormData
  const usuarios = [];
  
  // Buscar todos los índices de usuarios
  const usuarioIndices = new Set<number>();
  formEntries.forEach(([key]) => {
    const match = key.match(/^usuarios\[(\d+)\]/);
    if (match) {
      usuarioIndices.add(parseInt(match[1]));
    }
  });

  // Construir array de usuarios
  usuarioIndices.forEach(index => {
    const permisosString = formData.get(`usuarios[${index}][permisos]`) as string;
    let permisos;
    try {
      permisos = JSON.parse(permisosString);
    } catch {
      // Fallback a permisos por defecto si hay error en el JSON
      permisos = {
        contenidos: false,
        comunicados: false,
        usuarios: false,
        configuracion: false,
        reportes: false
      };
    }

    const usuario = {
      id: parseInt(formData.get(`usuarios[${index}][id]`) as string),
      nombre: formData.get(`usuarios[${index}][nombre]`) as string,
      email: formData.get(`usuarios[${index}][email]`) as string,
      usuario: formData.get(`usuarios[${index}][usuario]`) as string,
      rol: formData.get(`usuarios[${index}][rol]`) as string,
      estado: formData.get(`usuarios[${index}][estado]`) as string,
      permisos: permisos,
      requiereCambioContrasena: formData.get(`usuarios[${index}][requiereCambioContrasena]`) === "true",
    };
    usuarios.push(usuario);
  });

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
    
    // Contacto (legacy - mantenemos para compatibilidad)
    nombreContacto: formData.get("nombreContacto") as string,
    telefonoContacto: formData.get("telefonoContacto") as string,
    emailContacto: formData.get("emailContacto") as string,
    
    // Centro de control - configuraciones generales
    correoGestionCliente: formData.get("correoGestionCliente") as string,
    correoTekTeam: formData.get("correoTekTeam") as string,
    
    // Estado general del cliente
    activo: true, // Por defecto activo
    
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
    
    // Contactos múltiples
    contactos: contactos,
    
    // Usuarios múltiples del centro de control
    usuarios: usuarios,
  };

  // Validaciones de seguridad
  if (usuarios.length === 0 && !isEditing) {
    throw new Error("Debe crear al menos un usuario administrador");
  }

  // Verificar que al menos un usuario sea admin
  const tieneAdmin = usuarios.some(u => u.rol === 'admin' && u.estado === 'activo');
  if (!tieneAdmin && usuarios.length > 0) {
    throw new Error("Debe tener al menos un usuario administrador activo");
  }

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