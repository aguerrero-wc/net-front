// components/Clients/UpdateTimesCard.tsx
import type { Cliente } from "~/types/cliente";

interface UpdateTimesCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function UpdateTimesCard({ cliente, isEditing }: UpdateTimesCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-purple-800">Tiempos de Actualización</h2>
        <p className="text-sm text-purple-600 mt-1">Configura cada cuántos minutos se actualizan los datos</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenidos (minutos)
            </label>
            <div className="relative">
              <input
                type="number"
                name="contenidos"
                defaultValue={cliente.contenidos}
                min="1"
                max="1440"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-gray-400">min</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Frecuencia de actualización del contenido</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comunicados (minutos)
            </label>
            <div className="relative">
              <input
                type="number"
                name="comunicados"
                defaultValue={cliente.comunicados}
                min="1"
                max="1440"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-gray-400">min</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Frecuencia de actualización de comunicados</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RSS (minutos)
            </label>
            <div className="relative">
              <input
                type="number"
                name="rss"
                defaultValue={cliente.rss}
                min="1"
                max="1440"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-gray-400">min</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Frecuencia de actualización de feeds RSS</p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Recomendaciones</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Contenidos:</strong> Entre 5-30 minutos para sitios activos</li>
                <li>• <strong>Comunicados:</strong> Entre 1-5 minutos para información crítica</li>
                <li>• <strong>RSS:</strong> Entre 15-60 minutos para feeds externos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}