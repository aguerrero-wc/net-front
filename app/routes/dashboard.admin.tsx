// routes/dashboard.admin.tsx - ACTUALIZADO
import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import type { Role, SystemRoleSlug, PermissionObject, RolesApiResponse } from "~/types/roles";
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
    console.log('API Response:', data);
    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data || error.message);
      throw new Error(`API Error: ${error.response?.status || 'Network Error'} - ${JSON.stringify(error.response?.data)}`);
    } else {
      console.error('Error inesperado:', error);
      throw new Error('Ocurrió un error inesperado al procesar la petición.');
    }
  }
}

// Loader que verifica permisos y carga datos de administración
export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Obtener usuario actual desde sesión
  const currentUserRole: SystemRoleSlug = 'system_admin';

  // Solo system_admin puede acceder a esta ruta
  if (currentUserRole !== 'system_admin') {
    throw redirect('/dashboard');
  }

  try {
    // Cargar roles y permisos de la API
    const [rolesData, permissionsData] = await Promise.all([
      apiCall('/roles', {
        method: 'GET',
        params: { includePermissions: true }
      }) as Promise<Role[]>,
      apiCall('/permissions', {
        method: 'GET',
        params: {getAllPermissions:true}
      }) as Promise<PermissionObject[]>
    ]);

    console.log('Roles cargados:', rolesData);
    console.log('Permisos cargados:', permissionsData.length);

    return json({
      roles: rolesData,
      permissions: permissionsData,
      success: true
    });
    
  } catch (error) {
    console.error('Error cargando datos:', error);
    
    // Retornar datos vacíos en caso de error
    return json({
      roles: [],
      permissions: [],
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}

// Action para manejar operaciones administrativas (mantener tu implementación actual)
export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
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
          permissions: JSON.parse(formData.get('permissions') as string || '[]'), // ← IDs de permisos
          level: parseInt(formData.get('level') as string),
          isActive: formData.get('isActive') === 'true',
          isSystemRole: formData.get('isSystemRole') === 'true'
        };

        const newRole = await apiCall('/roles', {
          method: 'POST',
          data: roleData // ← Cambié de body a data para axios
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
          data: roleData
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
        
        const updatedRole = await apiCall(`/roles/${roleId}/toggle`, {
          method: 'PATCH',
          data: { isActive }
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

export default function AdminView() {
  const data = useLoaderData<typeof loader>();

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
        {/* Mostrar error si hay */}
        {!data.success && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Error cargando datos: {data.error}</p>
          </div>
        )}

        {/* Roles Management Section */}
        <div className="space-y-8">
          <RolesManagementCard 
            currentUserRole="system_admin"
            roles={data.roles}
            permissions={data.permissions} 
          />
        </div>
      </div>
    </div>
  );
}