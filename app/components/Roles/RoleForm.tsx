import { useState, useEffect } from "react";
import { Form, useNavigation } from "@remix-run/react";
import type { Role, PermissionObject } from "~/types/roles";
import { getPermissionsByCategory } from "~/types/roles";

interface RoleFormProps {
  role?: Role | null;
  availablePermissions?: PermissionObject[]; 
  onCancel: () => void;
  isEditing: boolean;
}

export default function RoleForm({ 
  role, 
  availablePermissions = [],
  onCancel, 
  isEditing 
}: RoleFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Estado del formulario
  const [formData, setFormData] = useState<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    slug: '',
    description: '',
    color: '#6366f1',
    icon: '🎭',
    permissions: [],
    level: 10,
    isActive: true,
    isSystemRole: false
  });

  // Cargar datos del rol cuando se edita
  useEffect(() => {
    if (role && isEditing) {
      setFormData({
        name: role.name,
        slug: role.slug,
        description: role.description || '',
        color: role.color || '#6366f1',
        icon: role.icon || '🎭',
        permissions: role.permissions,
        level: role.level,
        isActive: role.isActive,
        isSystemRole: role.isSystemRole
      });
    }
  }, [role, isEditing]);

  // Función para actualizar campos del formulario
  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generar slug automáticamente del nombre
  const handleNameChange = (name: string) => {
    updateField('name', name);
    updateField('slug', name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
  };

  // Toggle de permisos individuales
  const togglePermiso = (permiso: PermissionObject) => {
    const isSelected = formData.permissions.some(p => p.id === permiso.id);
    const newPermissions = isSelected
      ? formData.permissions.filter(p => p.id !== permiso.id)
      : [...formData.permissions, permiso];
    
    updateField('permissions', newPermissions);
  };

  // Toggle de toda una categoría
  const toggleCategoria = (categoria: string, permisos: PermissionObject[]) => {
    const permisosSeleccionados = permisos.filter(p => 
      formData.permissions.some(fp => fp.id === p.id)
    );
    
    const todoSeleccionado = permisosSeleccionados.length === permisos.length;
    
    let newPermissions;
    if (todoSeleccionado) {
      // Deseleccionar todos los permisos de esta categoría
      newPermissions = formData.permissions.filter(fp => 
        !permisos.some(p => p.id === fp.id)
      );
    } else {
      // Seleccionar todos los permisos de esta categoría
      const permisosNoSeleccionados = permisos.filter(p => 
        !formData.permissions.some(fp => fp.id === p.id)
      );
      newPermissions = [...formData.permissions, ...permisosNoSeleccionados];
    }
    
    updateField('permissions', newPermissions);
  };

  // Obtener estado del checkbox de categoría
  const getCategoriaState = (permisos: PermissionObject[]) => {
    const permisosSeleccionados = permisos.filter(p => 
      formData.permissions.some(fp => fp.id === p.id)
    );
    
    if (permisosSeleccionados.length === 0) return 'none'; // Ninguno seleccionado
    if (permisosSeleccionados.length === permisos.length) return 'all'; // Todos seleccionados
    return 'partial'; // Algunos seleccionados
  };

  // Obtener permisos agrupados por categoría
  const gruposPermisos = getPermissionsByCategory(availablePermissions);

  return (
    <Form method="post" className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
            {isEditing ? 'Editar Rol' : 'Crear Nuevo Rol'}
        </h3>
        
        {/* Campos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Nombre */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Rol <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Nombre descriptivo del rol"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
            />
            </div>
            
            {/* Slug */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                placeholder="nombre_del_rol"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
            />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Descripción del rol y sus responsabilidades"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
            </div>

            {/* Color e Icono */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex gap-2">
                <input
                type="color"
                name="colorPicker"
                value={formData.color}
                onChange={(e) => updateField('color', e.target.value)}
                className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
                />
                <input
                type="text"
                name="color"
                value={formData.color}
                onChange={(e) => updateField('color', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
            <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={(e) => updateField('icon', e.target.value)}
                placeholder="🎭"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            </div>

            {/* Nivel de Acceso */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Acceso</label>
            <select
                name="level"
                value={formData.level}
                onChange={(e) => updateField('level', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value={10}>Básico (10)</option>
                <option value={30}>Intermedio (30)</option>
                <option value={50}>Avanzado (50)</option>
                <option value={70}>Gestor (70)</option>
                <option value={90}>Administrador (90)</option>
                <option value={100}>Sistema (100)</option>
            </select>
            </div>

            {/* Checkbox Activo */}
            <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                Rol Activo
            </label>
            </div>
        </div>

        {/* Selector de Permisos */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
            Permisos ({formData.permissions.length} seleccionados)
            </label>
            <div className="space-y-4">
            {Object.entries(gruposPermisos).map(([categoria, permisos]) => {
                const categoriaState = getCategoriaState(permisos);
                const permisosSeleccionados = permisos.filter(p => 
                  formData.permissions.some(fp => fp.id === p.id)
                ).length;
                
                return (
                <div key={categoria} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 capitalize flex items-center gap-3">
                    {/* Checkbox para seleccionar toda la categoría */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={categoriaState === 'all'}
                        ref={(input) => {
                            if (input) {
                            input.indeterminate = categoriaState === 'partial';
                            }
                        }}
                        onChange={() => toggleCategoria(categoria, permisos)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="font-medium text-gray-900">
                        {categoria}
                        </span>
                    </label>
                    
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {permisosSeleccionados}/{permisos.length}
                    </span>
                    </h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-6">
                    {permisos.map(permiso => (
                    <label key={permiso.id} className="flex items-center gap-2 text-sm">
                        <input
                        type="checkbox"
                        name={`permission_${permiso.id}`}
                        checked={formData.permissions.some(p => p.id === permiso.id)}
                        onChange={() => togglePermiso(permiso)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-700" title={permiso.key}>
                        {permiso.description}
                        </span>
                    </label>
                    ))}
                </div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
            <button
            type="submit"
            disabled={!formData.name.trim() || !formData.slug.trim() || isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
            {isSubmitting && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isSubmitting 
                ? (isEditing ? 'Actualizando...' : 'Creando...') 
                : (isEditing ? 'Actualizar Rol' : 'Crear Rol')
            }
            </button>
            
            <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
            >
            Cancelar
            </button>
        </div>

        {/* Hidden inputs para Remix */}
        <input type="hidden" name="_action" value={isEditing ? "update_role" : "create_role"} />
        {isEditing && role && <input type="hidden" name="roleId" value={role.id} />}
        <input type="hidden" name="permissions" value={JSON.stringify(formData.permissions.map(p => p.id))} />
        <input type="hidden" name="isSystemRole" value={formData.isSystemRole.toString()} />
        </Form>
  );
}