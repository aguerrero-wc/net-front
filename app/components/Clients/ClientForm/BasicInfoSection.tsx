// app/components/Clients/ClientForm/BasicInfoSection.tsx
import { SectionCard } from "../shared/SectionCard";

interface BasicInfoSectionProps {
  initialData?: {
    name?: string;
    slug?: string;
    domain?: string;
    description?: string;
    isActive?: boolean;
    logo?: string;
    favicon?: string;
  };
}

export function BasicInfoSection({ initialData }: BasicInfoSectionProps) {
  return (
    <SectionCard
      title="Información Básica"
      colorScheme="orange"
      icon={
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del cliente <span className="text-[#E6600D]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={initialData?.name}
            placeholder="CDC - Clínica Del Country"
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug <span className="text-[#E6600D]">*</span>
          </label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={initialData?.slug}
            placeholder="cdc-clinica"
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">URL amigable (sin espacios ni caracteres especiales)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dominio
          </label>
          <input
            type="text"
            name="domain"
            defaultValue={initialData?.domain}
            placeholder="www.clinicadelcountry.com"
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Opcional</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={initialData?.description}
            placeholder="Descripción breve del cliente..."
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initialData?.isActive ?? true}
              className="w-4 h-4 text-[#E6600D] border-gray-300 rounded focus:ring-[#E6600D]"
            />
            <span className="text-sm text-gray-700">Cliente Activo</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="logo"
              defaultValue={initialData?.logo}
              placeholder="https://ejemplo.com/logo.png o 🏥"
              className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="px-4 py-3 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="favicon"
              defaultValue={initialData?.favicon}
              placeholder="https://ejemplo.com/favicon.ico"
              className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E6600D]/50 focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="px-4 py-3 bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}