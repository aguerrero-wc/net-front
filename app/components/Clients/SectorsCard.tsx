// components/Clients/SectorsCard.tsx
import { useState } from "react";
import type { Cliente } from "~/types/cliente";

interface SectorsCardProps {
  cliente: Cliente;
  isEditing: boolean;
}

export default function SectorsCard({ cliente, isEditing }: SectorsCardProps) {
  const [sectoresSeleccionados, setSectoresSeleccionados] = useState<string[]>(
    isEditing ? cliente.sectores : []
  );
  const [nuevoSector, setNuevoSector] = useState("");

  // Lista inicial de sectores disponibles
  const [sectoresDisponibles, setSectoresDisponibles] = useState([
    "Automocion", "Culto", "Deportes", "Economia", "Educacion", "Entretenimiento",
    "Financiero - Banca", "Retail", "Seguros", "Servicios Publicos", "Salud"
  ]);

  const agregarNuevoSector = () => {
    if (nuevoSector.trim() && !sectoresDisponibles.includes(nuevoSector.trim())) {
      setSectoresDisponibles(prev => [...prev, nuevoSector.trim()]);
      setSectoresSeleccionados(prev => [...prev, nuevoSector.trim()]);
      setNuevoSector("");
    }
  };

  const toggleSector = (sector: string) => {
    if (sectoresSeleccionados.includes(sector)) {
      setSectoresSeleccionados(prev => prev.filter(s => s !== sector));
    } else {
      setSectoresSeleccionados(prev => [...prev, sector]);
    }
  };

  const eliminarSectorSeleccionado = (sector: string) => {
    setSectoresSeleccionados(prev => prev.filter(s => s !== sector));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-purple-800">Seleccionar Sector</h2>
        <p className="text-sm text-purple-600 mt-1">Elige uno o más sectores que representen al cliente</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {/* Campo para agregar nuevo sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Agregar Nuevo Sector</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={nuevoSector}
                onChange={(e) => setNuevoSector(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarNuevoSector();
                  }
                }}
                placeholder="Nombre del nuevo sector..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={agregarNuevoSector}
                disabled={!nuevoSector.trim() || sectoresDisponibles.includes(nuevoSector.trim())}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </button>
            </div>
          </div>

          {/* Sectores disponibles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sectores Disponibles {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sectoresDisponibles.map((sector) => {
                const isSelected = sectoresSeleccionados.includes(sector);
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => toggleSector(sector)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{sector}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Sectores seleccionados */}
          {sectoresSeleccionados.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Sectores seleccionados ({sectoresSeleccionados.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {sectoresSeleccionados.map((sector) => (
                  <span
                    key={sector}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {sector}
                    <button
                      type="button"
                      onClick={() => eliminarSectorSeleccionado(sector)}
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje de validación para nuevo cliente */}
          {!isEditing && sectoresSeleccionados.length === 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-700 text-sm font-medium">
                  Debes seleccionar al menos un sector para continuar
                </p>
              </div>
            </div>
          )}

          {/* Hidden inputs para el formulario */}
          {sectoresSeleccionados.map((sector, index) => (
            <input
              key={index}
              type="hidden"
              name="sectores"
              value={sector}
            />
          ))}
        </div>
      </div>
    </div>
  );
}