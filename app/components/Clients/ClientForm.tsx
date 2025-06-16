// components/Clients/ClientForm.tsx
import type { Cliente } from "~/types/client";

// Importaciones de todos los componentes
import ClientDataCard from "./ClientDataCard";
import SiteConfigCard from "./SiteConfigCard";
// import ContactCard from "./ContactCard";
// import NotificationsCard from "./NotificationsCard";
// import SectorsCard from "./SectorsCard";
// import ControlCenterCard from "./ControlCenterCard";
// import UpdateTimesCard from "./UpdateTimesCard";

interface ClientFormProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ClientForm({ cliente, isEditing }: ClientFormProps) {
  return (
    <form id="client-form" className="space-y-8" method="post">
      {/* Datos del Cliente */}
      <ClientDataCard cliente={cliente} isEditing={isEditing} />

      {/* Configuración del Sitio */}
      <SiteConfigCard cliente={cliente} isEditing={isEditing} />

{/*       
      <ContactCard cliente={cliente} isEditing={isEditing} />

      
      <ControlCenterCard cliente={cliente} isEditing={isEditing} />

      
      <UpdateTimesCard cliente={cliente} isEditing={isEditing} />

      
      <NotificationsCard cliente={cliente} isEditing={isEditing} />

      
      <SectorsCard cliente={cliente} isEditing={isEditing} /> */}

      {/* Botones de acción */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {isEditing ? 'Guardar Cliente' : 'Crear Cliente'}
        </button>
      </div>
    </form>
  );
}