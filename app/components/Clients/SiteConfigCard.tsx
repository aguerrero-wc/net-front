import type { Cliente } from "~/types/client";

interface SiteConfigCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function SiteConfigCard({ cliente, isEditing }: SiteConfigCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-purple-800">Configuración del Sitio</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={cliente.slug || cliente.nombre?.toLowerCase().replace(/\s+/g, '-')}
              required={!isEditing}
              placeholder={!isEditing ? "slug-del-cliente" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dominio {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="dominio"
              defaultValue={cliente.dominio || ""}
              required={!isEditing}
              placeholder={!isEditing ? "ejemplo.com" : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="logo"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Logo</label>
            <select
              name="tipo"
              defaultValue={cliente.tipo}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Texto">Texto</option>
              <option value="Imagen">Imagen</option>
            </select>
          </div>
        </div>

        {/* Campo condicional para texto del logotipo */}
        <div className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto del Logotipo
            </label>
            <input
              type="text"
              name="textoLogotipo"
              defaultValue={cliente.textoLogotipo}
              placeholder="Texto que aparecerá como logo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}