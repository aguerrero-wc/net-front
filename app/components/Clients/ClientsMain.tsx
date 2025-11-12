// app/components/Clients/ClientsMain.tsx
import { Link, useSearchParams, useNavigation } from "@remix-run/react";
import { useClients, type ClientsResponse } from "./hooks/useClients";
import { ClientsHeader } from "./shared/ClientsHeader";
import { ClientsSearchBar } from "./shared/ClientsSearchBar";
import { ClientsTable } from "./shared/ClientsTable";
import { ClientsEmptyState } from "./shared/ClientsEmptyState";

interface ClientsMainProps {
  initialData: ClientsResponse;
}

export default function ClientsMain({ initialData }: ClientsMainProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  
  const {
    searchTerm,
    setSearchTerm,
    filteredClients,
    pagination,
    getClientDisplay,
    formatDate,
  } = useClients(initialData);

  const isLoading = navigation.state === "loading";

  // Handler para búsqueda con debounce (opcional)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Actualizar URL params para búsqueda del lado del servidor
    // setSearchParams({ search: value, page: "1" });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-orange-50 via-sky-50 to-emerald-50 min-h-screen relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6600D] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <ClientsHeader />

      {/* Main Content */}
      <div className="p-8 relative z-10">
        {/* Título con icono */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestionar Clientes</h1>
            <p className="text-gray-600 mt-1">Administra y organiza todos tus clientes institucionales</p>
          </div>
        </div>

        {/* Search Bar */}
        <ClientsSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          onClearSearch={handleClearSearch}
        />

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-4 px-2">
            <p className="text-sm text-gray-600">
              Se encontraron <span className="font-semibold text-[#E6600D]">{filteredClients.length}</span> resultados
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl p-12 text-center">
            <div className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-8 w-8 text-[#E6600D]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-gray-600 font-medium">Cargando clientes...</span>
            </div>
          </div>
        )}

        {/* Table or Empty State */}
        {!isLoading && filteredClients.length > 0 ? (
          <ClientsTable
            clients={filteredClients}
            getClientDisplay={getClientDisplay}
            formatDate={formatDate}
          />
        ) : !isLoading && (
          <ClientsEmptyState
            searchTerm={searchTerm}
            onClearSearch={handleClearSearch}
          />
        )}

        {/* Pagination */}
        {!isLoading && filteredClients.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-[#E6600D]">1-{filteredClients.length}</span> de <span className="font-semibold text-[#E6600D]">{pagination.total}</span> clientes
            </p>
            <div className="flex items-center gap-2">
              <Link
                to={`?page=${Math.max(1, pagination.page - 1)}`}
                className={`px-5 py-2.5 text-sm font-semibold rounded-2xl ${
                  pagination.page <= 1
                    ? 'text-gray-400 backdrop-blur-sm bg-white/40 border border-gray-200/50 cursor-not-allowed'
                    : 'text-gray-700 backdrop-blur-sm bg-white/60 border border-gray-200/50 hover:bg-white/80 transition-all hover:scale-105 active:scale-95'
                }`}
              >
                Anterior
              </Link>
              <span className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] rounded-2xl shadow-lg">
                {pagination.page}
              </span>
              <Link
                to={`?page=${pagination.page + 1}`}
                className={`px-5 py-2.5 text-sm font-semibold rounded-2xl ${
                  pagination.page >= pagination.totalPages
                    ? 'text-gray-400 backdrop-blur-sm bg-white/40 border border-gray-200/50 cursor-not-allowed'
                    : 'text-gray-700 backdrop-blur-sm bg-white/60 border border-gray-200/50 hover:bg-white/80 transition-all hover:scale-105 active:scale-95'
                }`}
              >
                Siguiente
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Animaciones CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}