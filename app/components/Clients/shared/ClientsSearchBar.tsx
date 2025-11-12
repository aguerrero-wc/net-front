// app/components/Clients/shared/ClientsSearchBar.tsx
import { Link } from "@remix-run/react";

interface ClientsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export function ClientsSearchBar({ searchTerm, onSearchChange, onClearSearch }: ClientsSearchBarProps) {
  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar clientes..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={onClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <Link
          to="/dashboard/clients/new"
          className="bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white px-6 py-3.5 rounded-2xl font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Cliente
        </Link>
      </div>
    </div>
  );
}