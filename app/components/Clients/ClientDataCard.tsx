// components/Clients/ClientDataCard.tsx
import type { Cliente } from "~/types/cliente";

interface ClientDataCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ClientDataCard({ cliente, isEditing }: ClientDataCardProps) {
  return (
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
              name="nombre"
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
              name="direccion"
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
              name="telefono"
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
              name="ciudad"
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
              name="nit"
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
              name="numeroContrato"
              defaultValue={cliente.numeroContrato}
              placeholder={!isEditing ? "Número de contrato" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}