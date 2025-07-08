import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import type { Role, SystemRoleSlug, AdminLoaderData } from "~/types/roles";
import { SYSTEM_ROLES, PERMISSIONS } from "~/types/roles";
import RolesManagementCard from "~/components/Roles/RolesManagementCard";

async function apiCall(endpoint: string, options: AxiosRequestConfig = {}) {
  const baseUrl = process.env.API_URL || 'http://localhost:3001/v1';

  try {
    const response = await axios({
      url: `${baseUrl}${endpoint}`,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers, 
      },
    });

    const data = response.data.data;
    console.log('rolessssssssss', data);
    return data;

  } catch (error) {
    // Axios proporciona un manejo de errores mucho más detallado
    if (axios.isAxiosError(error)) {
      // El error viene de la petición (ej. 404, 500, etc.)
      console.error('Error de Axios:', error.response?.data || error.message);
      // Lanzamos un error más descriptivo que puede ser capturado por el loader/action de Remix
      throw new Error(`API Error: ${error.response?.status || 'Network Error'} - ${JSON.stringify(error.response?.data)}`);
    } else {
      // Es un error inesperado (ej. un problema en la lógica antes de la llamada)
      console.error('Error inesperado:', error);
      throw new Error('Ocurrió un error inesperado al procesar la petición.');
    }
  }
}



// Loader que verifica permisos y carga datos de administración
export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Obtener usuario actual desde sesión
  // const user = await getUserFromSession(request);
  // if (!user || user.role !== 'system_admin') {
  //   throw redirect('/dashboard');
  // }

  // Mock data - reemplazar con llamadas reales al backend
  const currentUserRole: SystemRoleSlug = 'system_admin'; // TODO: obtener del usuario actual

  // Solo system_admin puede acceder a esta ruta
  if (currentUserRole !== 'system_admin') {
    throw redirect('/dashboard');
  }

  // Cargar roles del sistema
  // const roles: Role[] = [
  //   {
  //     id: '1',
  //     name: 'Administrador del Sistema',
  //     slug: 'system_admin',
  //     description: 'Acceso completo a todo el sistema multi-tenant',
  //     color: '#dc2626',
  //     icon: '⚡',
  //     permissions: Object.keys(PERMISSIONS) as (keyof typeof PERMISSIONS)[],
  //     level: 100,
  //     isActive: true,
  //     isSystemRole: true,
  //     createdAt: '2024-01-01T00:00:00Z',
  //     updatedAt: '2024-01-01T00:00:00Z'
  //   },
  //   {
  //     id: '2', 
  //     name: 'Administrador del Cliente',
  //     slug: 'tenant_admin',
  //     description: 'Gestión completa del cliente asignado',
  //     color: '#ea580c',
  //     icon: '👑',
  //     permissions: [
  //       'users.create', 'users.read', 'users.update', 'users.delete',
  //       'content.create', 'content.read', 'content.update', 'content.delete', 'content.publish',
  //       'announcements.create', 'announcements.read', 'announcements.update', 'announcements.delete', 'announcements.publish',
  //       'reports.read', 'reports.export',
  //       'settings.read', 'settings.update'
  //     ],
  //     level: 90,
  //     isActive: true,
  //     isSystemRole: true,
  //     createdAt: '2024-01-01T00:00:00Z',
  //     updatedAt: '2024-01-01T00:00:00Z'
  //   },
  //   {
  //     id: '3',
  //     name: 'Gestor de Contenidos', 
  //     slug: 'content_manager',
  //     description: 'Gestión avanzada de contenidos y comunicados',
  //     color: '#d97706',
  //     icon: '📝',
  //     permissions: [
  //       'users.read',
  //       'content.create', 'content.read', 'content.update', 'content.delete', 'content.publish',
  //       'announcements.create', 'announcements.read', 'announcements.update', 'announcements.delete', 'announcements.publish',
  //       'reports.read'
  //     ],
  //     level: 70,
  //     isActive: true,
  //     isSystemRole: true,
  //     createdAt: '2024-01-01T00:00:00Z',
  //     updatedAt: '2024-01-01T00:00:00Z'
  //   },
  //   {
  //     id: '4',
  //     name: 'Editor',
  //     slug: 'editor',
  //     description: 'Creación y edición de contenidos',
  //     color: '#059669',
  //     icon: '✏️',
  //     permissions: [
  //       'content.create', 'content.read', 'content.update', 'content.publish',
  //       'reports.read'
  //     ],
  //     level: 50,
  //     isActive: true,
  //     isSystemRole: true,
  //     createdAt: '2024-01-01T00:00:00Z',
  //     updatedAt: '2024-01-01T00:00:00Z'
  //   },
  //   {
  //     id: '5',
  //     name: 'Visualizador',
  //     slug: 'viewer',
  //     description: 'Solo visualización de contenidos y reportes',
  //     color: '#6b7280',
  //     icon: '👁️',
  //     permissions: [
  //       'content.read',
  //       'announcements.read', 
  //       'reports.read'
  //     ],
  //     level: 10,
  //     isActive: true,
  //     isSystemRole: true,
  //     createdAt: '2024-01-01T00:00:00Z',
  //     updatedAt: '2024-01-01T00:00:00Z'
  //   }
  // ];

  // Llamadas reales a la API
  // const roles = await apiCall('/roles',{
  //   method: 'GET'
  // })

  const [ roles, permissions ] = await Promise.all([
    apiCall('/roles',{
      method: 'GET',
      params: { includePermissions: true}
    }),
    apiCall('/permissions',{
      method: 'GET',
    }),
  ])

  console.log('dataaaa', roles, permissions);
  return json({
      roles: roles, // Ya están enriquecidos
      permissions,
      success: true
    });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  console.log('datos', formData);
  
  const actionType = formData.get('_action') as string;

  try {
    switch (actionType) {
      case 'create_role': {
        const roleData = {
          name: formData.get('name') as string,
          slug: formData.get('slug') as string,
          description: formData.get('description') as string,
          color: formData.get('color') as string,
          icon: formData.get('icon') as string,
          permissions: JSON.parse(formData.get('permissions') as string || '[]'),
          level: parseInt(formData.get('level') as string),
          isActive: formData.get('isActive') === 'true',
          isSystemRole: formData.get('isSystemRole') === 'true'
        };

        const newRole = await apiCall('/roles', {
          method: 'POST',
          body: roleData
        });

        return json({ 
          success: true, 
          message: 'Rol creado exitosamente',
          data: newRole 
        });
      }
      
      case 'update_role': {
        const roleId = formData.get('roleId') as string;
        const roleData = {
          name: formData.get('name') as string,
          slug: formData.get('slug') as string,
          description: formData.get('description') as string,
          color: formData.get('color') as string,
          icon: formData.get('icon') as string,
          permissions: JSON.parse(formData.get('permissions') as string || '[]'),
          level: parseInt(formData.get('level') as string),
          isActive: formData.get('isActive') === 'true'
        };

        const updatedRole = await apiCall(`/roles/${roleId}`, {
          method: 'PUT',
          body: roleData
        });

        return json({ 
          success: true, 
          message: 'Rol actualizado exitosamente',
          data: updatedRole 
        });
      }
      
      case 'delete_role': {
        const roleId = formData.get('roleId') as string;
        
        await apiCall(`/roles/${roleId}`, {
          method: 'DELETE'
        });

        return json({ 
          success: true, 
          message: 'Rol eliminado exitosamente' 
        });
      }

      case 'toggle_role_status': {
        const roleId = formData.get('roleId') as string;
        const isActive = formData.get('isActive') === 'true';
        
        const updatedRole = await apiCall(`/admin/roles/${roleId}/toggle`, {
          method: 'PATCH',
          body: JSON.stringify({ isActive })
        });

        return json({ 
          success: true, 
          message: `Rol ${isActive ? 'activado' : 'desactivado'} exitosamente`,
          data: updatedRole 
        });
      }
      
      default:
        return json({ 
          success: false, 
          message: `Acción no reconocida: ${actionType}` 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in action:', error);
    
    return json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Error interno del servidor'
    }, { status: 500 });
  }
}

// Action para manejar operaciones administrativas
// export async function action({ request }: LoaderFunctionArgs) {
//   const formData = await request.formData();
//   const action = formData.get('_action') as string;

//   switch (action) {
//     case 'create_role':
//       // TODO: Crear rol
//       console.log('Creando rol:', Object.fromEntries(formData.entries()));
//       break;
    
//     case 'update_role':
//       // TODO: Actualizar rol
//       console.log('Actualizando rol:', Object.fromEntries(formData.entries()));
//       break;
    
//     case 'delete_role':
//       // TODO: Eliminar rol
//       console.log('Eliminando rol:', formData.get('roleId'));
//       break;
    
//     default:
//       throw new Error(`Acción no reconocida: ${action}`);
//   }

//   return redirect('/dashboard/admin');
// }

export default function AdminView() {
  const data = useLoaderData<typeof loader>();
  const roles = data.roles;

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <span>🏠</span>
            <Link to="/dashboard" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Administración</span>
          </nav>
          
          {/* User info */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              ⚡ System Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">

        {/* Roles Management Section */}
        <div className="space-y-8">
          <RolesManagementCard 
            // currentUserRole={currentUserRole}
            currentUserRole='system_admin'
            roles={roles}
          />
        </div>

        {/* System Information */}
        {/* <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <h2 className="text-lg font-semibold text-gray-800">Información del Sistema</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Versión del Sistema</h3>
                <p className="text-sm text-gray-600">v2.1.0</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Última Actualización</h3>
                <p className="text-sm text-gray-600">15 de Junio, 2025</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Entorno</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Producción
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Base de Datos</h3>
                <p className="text-sm text-gray-600">PostgreSQL 14.2</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}