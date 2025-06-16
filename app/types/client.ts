// types/cliente.ts
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
}

export interface LoaderData {
  cliente: Cliente;
  isEditing: boolean;
}