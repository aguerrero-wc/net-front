import { Link, useLocation, Form } from "@remix-run/react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  timezone?: string | null;
  language?: string;
  preferences?: any;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  lastLoginIp: string;
  isActive: boolean;
  isBlocked: boolean;
  blockedReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SidebarProps {
  user?: User;
}

export default function Sidebar({ user }: SidebarProps) {
  const location = useLocation();
  
  // Combinar firstName y lastName para el nombre completo
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Usuario';
  const initials = user 
    ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`.toUpperCase()
    : 'U';
  
  const menuItems = [
    // { icon: "🏠", label: "Inicio", count: null, href: "/dashboard" },
    { icon: "🤝", label: "Clientes", count: null, href: "/dashboard/clients" },
    { icon: "👤", label: "Usuarios", count: null, href: "/dashboard/users" },
    { icon: "👥", label: "Roles", count: null, href: "/dashboard/roles" },
    // { icon: "🔒", label: "Permisos", count: null, href: "/dashboard/permissions" },
    // { icon: "📦", label: "Winbox", count: null, href: "/dashboard/winboxs" },
    // { icon: "📺", label: "Canales", count: null, href: "/dashboard/channels" },
    // { icon: "🎬", label: "Contenidos", count: null, href: "/dashboard/contents" },
    // { icon: "📰", label: "Noticias", count: null, href: "/dashboard/news" },
    // { icon: "📡", label: "Emisiones especificas", count: 2, href: "/dashboard/emisiones" },
    // { icon: "⚙️", label: "Settings", count: null, href: "/dashboard/settings" },
    // { icon: "📊", label: "Estadisticas", count: null, href: "/dashboard/stats" },
    // { icon: "🔌", label: "APIs", count: null, href: "/dashboard/apis" },
    // { icon: "🔔", label: "Notificaciones", count: 3, href: "/dashboard/notifications" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-64 backdrop-blur-xl bg-white/50 border-r border-white/50 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">WC</span>
          </div>
          <span className="font-semibold text-gray-900">Windows Channel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all group ${
                  isActiveRoute(item.href)
                    ? 'bg-gradient-to-r from-[#E6600D] to-[#FF7A2F] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/60 backdrop-blur-sm'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.count && (
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    isActiveRoute(item.href)
                      ? 'bg-white/30 text-white'
                      : 'bg-[#E6600D]/10 text-[#E6600D]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section - Space Alert */}
      {/* <div className="p-4 border-t border-white/50">
        <div className="backdrop-blur-sm bg-orange-50/80 border border-orange-200/50 rounded-2xl p-4 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            Space Almost Expired
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            You're running out of space. Please upgrade or go pro today.
          </p>
          <div className="flex gap-2">
            <button className="text-xs text-gray-600 hover:text-gray-800 transition-colors">
              Dismiss
            </button>
            <button className="text-xs text-[#E6600D] font-medium hover:text-[#CC5509] transition-colors">
              Go Pro
            </button>
          </div>
        </div>
      </div> */}

      {/* User Profile con Logout */}
      <div className="p-4 border-t border-white/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#E6600D] to-[#FF7A2F] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-sm">
              {initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'Administrador'}
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Botón de Logout */}
        <Form method="post" action="/auth/logout">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </Form>
      </div>
    </div>
  );
}