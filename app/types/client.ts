// types/client.ts
export interface Contacto {
  id: number;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
  esContactoPrincipal: boolean;
  departamento: string;
}

// Legacy - mantenemos para compatibilidad con el sistema actual
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  usuario: string;
  rol: 'admin' | 'editor' | 'viewer' | 'moderator';
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaCreacion: string;
  ultimoAcceso?: string;
  permisos: {
    contenidos: boolean;
    comunicados: boolean;
    usuarios: boolean;
    configuracion: boolean;
    reportes: boolean;
  };
  requiereCambioContrasena: boolean;
  fechaUltimoCambioContrasena?: string;
}

export interface Cliente {
  id?: number;
  nombre: string;
  tipo: "Texto" | "Imagen";
  textoLogotipo: string;
  logo: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  nit: string;
  numeroContrato: string;
  activo: boolean;
  nombreContacto: string;
  telefonoContacto: string;
  emailContacto: string;
  correoGestionCliente: string;
  correoTekTeam: string;
  usuario: string;
  contraseña: string;
  imagen: string;
  contenidos: number;
  comunicados: number;
  rss: number;
  emailAlerta: string;
  sectores: string[];
  // Nuevos campos para configuración del sitio
  slug?: string;
  dominio?: string;
  // Campos para notificaciones dinámicas (opcionales ya que se manejan con estado)
  emailsNotificaciones?: string[];
  emailsAlertas?: string[];
  numerosWhatsapp?: string[];
  // Campo para contactos múltiples
  contactos?: Contacto[];
  // Campo para usuarios múltiples del centro de control (legacy)
  usuarios?: Usuario[];
}

export interface LoaderData {
  cliente: Cliente;
  isEditing: boolean;
}