// app/routes/dashboard.clients.new.tsx
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useState, useEffect } from "react";

import { BasicInfoSection } from "~/components/Clients/ClientForm/BasicInfoSection";
import { ContactsSection } from "~/components/Clients/ClientForm/ContactsSection";
import { ServicesSection } from "~/components/Clients/ClientForm/ServicesSection";

import { SuccessModal } from "~/components/shared/SuccessModal";
import { apiPost } from "~/services/api.server";
// import type { Tenant } from "~/types/tenant";

type ActionData = {
  success?: boolean;
  client?: any;
  errors?: string[];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // ← Parsear contactos desde el input hidden
  const contactosJson = formData.get("contactos") as string;
  let contacts = [];
  
  try {
    const contactosArray = contactosJson ? JSON.parse(contactosJson) : [];
    
    // ← Mapear los contactos del frontend al formato del backend
    contacts = contactosArray.map((contacto: any) => ({
      type: mapearDepartamentoATipo(contacto.departamento), // Función helper
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
  
  const clientData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    domain: formData.get("domain") as string || undefined,
    description: formData.get("description") as string || undefined,
    isActive: formData.get("isActive") === "on",
    logo: formData.get("logo") as string || undefined,
    favicon: formData.get("favicon") as string || undefined,
    contactEmail: formData.get("contactEmail") as string,
    contactPhone: formData.get("contactPhone") as string || undefined,
    contacts, // ← Agregar los contactos aquí
  };

  // Validación
  const errors: string[] = [];
  if (!clientData.name) errors.push("El nombre es requerido");
  if (!clientData.slug) errors.push("El slug es requerido");
  if (!clientData.contactEmail) errors.push("El email de contacto es requerido");

  if (errors.length > 0) {
    return json<ActionData>({ errors }, { status: 400 });
  }

  try {
    const response = await apiPost(request, "/tenants", clientData);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return json<ActionData>(
        { errors: [errorData.message || "Error al crear el cliente"] },
        { status: response.status }
      );
    }

    const newClient: any = await response.json();
    console.log("✅ Cliente creado:", newClient);

    return json<ActionData>({ 
      success: true, 
      client: newClient 
    });
    
  } catch (error) {
    console.error("❌ Error al crear cliente:", error);
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

// ← Helper para mapear departamento a ContactType
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

export default function ClientsNew() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setShowSuccessModal(true);
    }
  }, [actionData?.success]);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Cliente</h1>
        <p className="text-sm text-gray-500 mt-1">
          Completa la información para crear un nuevo cliente
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

      {/* Form */}
      <Form method="post">
        <BasicInfoSection />
        <ContactsSection />
        <ServicesSection />
        
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
                Guardando...
              </>
            ) : (
              "Guardar Cliente"
            )}
          </button>
        </div>
      </Form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Cliente creado exitosamente!"
        message={`El cliente "${actionData?.client?.name}" ha sido creado correctamente.`}
        actionLabel="Ver cliente"
        actionUrl={actionData?.client ? `/dashboard/clients/${actionData.client.id}` : "/dashboard/clients"}
      />
    </div>
  );
}