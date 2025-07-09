// components/Roles/RolesList.tsx
import type { Role } from "~/types/roles";
import RoleCard from "./RoleCard";

interface RolesListProps {
  roles: Role[];
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
  onToggleStatus: (roleId: string, isActive: boolean) => void;
}

export default function RolesList({ 
  roles, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: RolesListProps) {
  
  // Estado vacío
  if (roles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <p className="text-sm">No hay roles configurados</p>
        <p className="text-xs text-gray-400 mt-1">Haz clic en "Crear Rol" para empezar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          roleId={role.id} // ✅ Pasando el ID del rol
          role={role}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
      
      {/* Hidden inputs para el formulario de Remix (si es necesario) */}
      {roles.map((rol, index) => (
        <div key={`hidden-${rol.id}`} style={{ display: 'none' }}>
          <input type="hidden" name={`roles[${index}][id]`} value={rol.id} />
          <input type="hidden" name={`roles[${index}][name]`} value={rol.name} />
          <input type="hidden" name={`roles[${index}][slug]`} value={rol.slug} />
          <input type="hidden" name={`roles[${index}][description]`} value={rol.description || ''} />
          <input type="hidden" name={`roles[${index}][color]`} value={rol.color || ''} />
          <input type="hidden" name={`roles[${index}][icon]`} value={rol.icon || ''} />
          <input type="hidden" name={`roles[${index}][permissions]`} value={JSON.stringify(rol.permissions.map(p => p.id))} />
          <input type="hidden" name={`roles[${index}][level]`} value={rol.level} />
          <input type="hidden" name={`roles[${index}][isActive]`} value={rol.isActive.toString()} />
          <input type="hidden" name={`roles[${index}][isSystemRole]`} value={rol.isSystemRole.toString()} />
        </div>
      ))}
    </div>
  );
}