// app/components/Clients/shared/ClientsEmptyState.tsx

interface ClientsEmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export function ClientsEmptyState({ searchTerm, onClearSearch }: ClientsEmptyStateProps) {
  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron clientes</h3>
      <p className="text-gray-600 mb-6">
        {searchTerm 
          ? `No hay clientes que coincidan con tu búsqueda "${searchTerm}"`
          : "No hay clientes registrados aún"
        }
      </p>
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="px-6 py-2.5 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Limpiar Búsqueda
        </button>
      )}
    </div>
  );
}