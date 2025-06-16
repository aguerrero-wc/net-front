// components/Clients/ControlCenterCard.tsx
import type { Cliente } from "~/types/cliente";

interface ControlCenterCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function ControlCenterCard({ cliente, isEditing }: ControlCenterCardProps) {
  return (
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
              name="usuario"
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
            <div className="relative">
              <input
                type="password"
                name="contraseña"
                defaultValue={isEditing ? "••••••" : ""}
                required={!isEditing}
                placeholder={!isEditing ? "Contraseña segura" : ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {isEditing && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    Cambiar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              name="activo"
              defaultValue={cliente.activo ? "true" : "false"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Gestión Cliente
            </label>
            <input
              type="email"
              name="correoGestionCliente"
              defaultValue={cliente.correoGestionCliente}
              placeholder="gestion@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Tek Team
            </label>
            <textarea
              name="correoTekTeam"
              defaultValue={cliente.correoTekTeam}
              placeholder="team1@ejemplo.com, team2@ejemplo.com"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}