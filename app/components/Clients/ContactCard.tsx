// components/Clients/ContactCard.tsx
import type { Cliente } from "~/types/client";

interface ContactCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ContactCard({ cliente, isEditing }: ContactCardProps) {
  return (
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
              name="nombreContacto"
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
              name="telefonoContacto"
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
              name="emailContacto"
              defaultValue={cliente.emailContacto}
              required={!isEditing}
              placeholder={!isEditing ? "email@ejemplo.com" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}