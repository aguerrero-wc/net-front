import type { ReactNode } from "react";

type ColorScheme = 'orange' | 'blue' | 'green' | 'purple' | 'amber';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  colorScheme: ColorScheme;
  children: ReactNode;
  action?: ReactNode;
}

// ✅ Definir estilos predefinidos (Tailwind puede verlos)
const colorSchemes = {
  orange: {
    header: 'bg-gradient-to-r from-[#E6600D]/10 to-[#FF7A2F]/10 border-orange-200/50',
    icon: 'bg-gradient-to-br from-[#E6600D] to-[#FF7A2F]'
  },
  blue: {
    header: 'bg-gradient-to-r from-sky-500/10 to-blue-500/10 border-sky-200/50',
    icon: 'bg-gradient-to-br from-sky-500 to-blue-500'
  },
  green: {
    header: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-200/50',
    icon: 'bg-gradient-to-br from-emerald-500 to-green-500'
  },
  purple: {
    header: 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-200/50',
    icon: 'bg-gradient-to-br from-indigo-500 to-purple-500'
  },
  amber: {
    header: 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-200/50',
    icon: 'bg-gradient-to-br from-amber-500 to-yellow-500'
  }
};

export function SectionCard({ 
  title, 
  icon, 
  colorScheme,
  children,
  action 
}: SectionCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div className={`${colors.header} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${colors.icon} rounded-xl shadow-lg flex items-center justify-center`}>
              {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          {action}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}