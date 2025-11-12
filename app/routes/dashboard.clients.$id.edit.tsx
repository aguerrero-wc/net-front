// app/routes/dashboard.clients.$id.edit.tsx
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useState, useEffect } from "react";

import { BasicInfoSection } from "~/components/Clients/ClientForm/BasicInfoSection";
import { ContactsSection } from "~/components/Clients/ClientForm/ContactsSection";
import { ServicesSection } from "~/components/Clients/ClientForm/ServicesSection";
import { SuccessModal } from "~/components/shared/SuccessModal";
import { apiGet, apiPatch } from "~/services/api.server";

type LoaderData = {
  client: any;
};

type ActionData = {
  success?: boolean;
  client?: any;
  errors?: string[];
};

// ========== LOADER: Cargar datos del cliente ==========
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("ID no proporcionado", { status: 400 });
  }

  try {
    const response = await apiGet(request, `/tenants/${id}`);
    
    if (!response.ok) {
      throw new Response("Cliente no encontrado", { status: 404 });
    }

    const client = await response.json();
    
    return json<LoaderData>({ client });
  } catch (error) {
    console.error("Error loading client:", error);
    throw new Response("Error al cargar el cliente", { status: 500 });
  }
}

// ========== ACTION: Actualizar cliente ==========
export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();

  // Parsear contactos
  const contactosJson = formData.get("contactos") as string;
  let contacts = [];
  
  try {
    const contactosArray = contactosJson ? JSON.parse(contactosJson) : [];
    contacts = contactosArray.map((contacto: any) => ({
      type: mapearDepartamentoATipo(contacto.departamento),
      name: contacto.nombre,
      email: contacto.email,
      phone: contacto.telefono || undefined,
      position: contacto.cargo || undefined,
      department: contacto.departamento || undefined,
      isPrimary: contacto.esContactoPrincipal || false,
      isActive: true,
    }));
  } catch (error) {
    console.error("Error al parsear contactos:", error);
  }

  // Parsear servicios externos
  const externalServicesJson = formData.get("externalServices") as string;
  let externalServices = [];
  
  try {
    externalServices = externalServicesJson ? JSON.parse(externalServicesJson) : [];
  } catch (error) {
    console.error("Error al parsear servicios externos:", error);
  }

  const clientData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    domain: formData.get("domain") as string || undefined,
    description: formData.get("description") as string || undefined,
    isActive: formData.get("isActive") === "on",
    logo: formData.get("logo") as string || undefined,
    favicon: formData.get("favicon") as string || undefined,
    contacts,
    externalServices,
  };

  // Validación
  const errors: string[] = [];
  if (!clientData.name) errors.push("El nombre es requerido");
  if (!clientData.slug) errors.push("El slug es requerido");

  if (errors.length > 0) {
    return json<ActionData>({ errors }, { status: 400 });
  }

  try {
    const response = await apiPatch(request, `/tenants/${id}`, clientData);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return json<ActionData>(
        { errors: [errorData.message || "Error al actualizar el cliente"] },
        { status: response.status }
      );
    }

    const updatedClient = await response.json();
    console.log("✅ Cliente actualizado:", updatedClient);

    return redirect(`/dashboard/clients/${id}`);
    
  } catch (error) {
    console.error("❌ Error al actualizar cliente:", error);
    return json<ActionData>(
      { 
        errors: [
          error instanceof Error 
            ? error.message 
            : "Error de conexión con el servidor"
        ] 
      },
      { status: 500 }
    );
  }
}

function mapearDepartamentoATipo(departamento: string): string {
  const mapa: Record<string, string> = {
    "IT/Sistemas": "sistemas",
    "Marketing": "comunicaciones",
    "Comunicaciones": "comunicaciones",
    "Ventas": "ventas",
    "Administración": "administrativo",
    "Recursos Humanos": "administrativo",
    "Operaciones": "soporte",
    "Gerencia General": "general",
  };
  
  return mapa[departamento] || "general";
}

export default function ClientEdit() {
  const { client } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setShowSuccessModal(true);
    }
  }, [actionData?.success]);

  // Transformar contactos del backend al formato del frontend
  const initialContacts = client.contacts?.map((contact: any) => ({
    id: Date.now() + Math.random(), // ID temporal para el frontend
    nombre: contact.name,
    email: contact.email,
    telefono: contact.phone || "",
    cargo: contact.position || "",
    departamento: contact.department || "",
    esContactoPrincipal: contact.isPrimary,
  })) || [];

  // Transformar servicios del backend al formato del frontend
  const initialServices = client.externalServices?.map((service: any) => ({
    id: Date.now() + Math.random(), // ID temporal para el frontend
    serviceType: service.serviceType,
    isActive: service.isActive,
    credentials: service.credentials || {},
  })) || [];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar Cliente</h1>
        <p className="text-sm text-gray-500 mt-1">
          Actualiza la información del cliente: {client.name}
        </p>
      </div>

      {/* Errores */}
      {actionData?.errors && actionData.errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <svg 
              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Hay algunos errores:
              </h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                {actionData.errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Form con datos iniciales */}
      <Form method="post">
        <BasicInfoSection 
          initialData={{
            name: client.name,
            slug: client.slug,
            domain: client.domain,
            description: client.description,
            isActive: client.isActive,
            logo: client.logo,
            favicon: client.favicon,
          }}
        />
        
        <ContactsSection initialContacts={initialContacts} />
        
        <ServicesSection initialServices={initialServices} />
        
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg 
                  className="animate-spin h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                  />
                </svg>
                Guardando cambios...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </Form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Cliente actualizado exitosamente!"
        message={`Los cambios en "${client.name}" han sido guardados correctamente.`}
        actionLabel="Ver cliente"
        actionUrl={`/dashboard/clients/${client.id}`}
      />
    </div>
  );
}