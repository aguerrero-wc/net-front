import { Link, useLocation } from "@remix-run/react";

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { icon: "🏠", label: "Home", count: null, href: "/dashboard" },
    { icon: "🤝", label: "Clientes", count: null, href: "/dashboard/clients" },
    { icon: "📦", label: "Winbox", count: null, href: "/dashboard/winboxs" },
    { icon: "📺", label: "Canales", count: null, href: "/dashboard/channels" },
    { icon: "🎬", label: "Contenidos", count: null, href: "/dashboard/contents" },
    { icon: "📰", label: "Noticias", count: null, href: "/dashboard/news" },
    { icon: "📡", label: "Emisiones especificas", count: 2, href: "/dashboard/emisiones" },
    { icon: "⚙️", label: "Settings", count: null, href: "/dashboard/settings" },
    { icon: "📊", label: "Estadisticas", count: null, href: "/dashboard/stats" },
    { icon: "🔌", label: "APIs", count: null, href: "/dashboard/apis" },
    { icon: "🔌", label: "Notificaciones", count: 3, href: "/dashboard/notifications" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">WC</span>
          </div>
          <span className="font-semibold text-gray-900">Windows Channel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg transition-colors group ${
                  isActiveRoute(item.href)
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.count && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActiveRoute(item.href)
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600'
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
      <div className="p-4 border-t border-gray-200">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            ✕
          </button>
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            Space Almost Expired
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            You're running out of space. Please upgrade or go pro today.
          </p>
          <div className="flex gap-2">
            <button className="text-xs text-gray-600 hover:text-gray-800">
              Dismiss
            </button>
            <button className="text-xs text-purple-600 font-medium hover:text-purple-800">
              Go Pro
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Andres Guerrero
            </p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}