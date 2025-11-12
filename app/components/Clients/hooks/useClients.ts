// app/components/Clients/hooks/useClients.ts
import { useState, useEffect } from "react";

export interface ClientListItem {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  servicesCount?: number;
  contactsCount?: number;
  configuration?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface ClientsResponse {
  data: ClientListItem[];
  total: number;
  page: number;
  totalPages: number;
}

export function useClients(initialData?: ClientsResponse) {
  const [clients, setClients] = useState<ClientListItem[]>(initialData?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: initialData?.total || 0,
    page: initialData?.page || 1,
    totalPages: initialData?.totalPages || 1,
  });

  // Filtrado local (opcional si prefieres filtrado del lado del servidor)
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.domain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper para obtener iniciales o emoji del logo
  const getClientDisplay = (client: ClientListItem) => {
    if (client.logo) {
      // Si es una URL, retornar para usar en img
      if (client.logo.startsWith('http')) {
        return { type: 'image', value: client.logo };
      }
      // Si es un emoji
      if (/\p{Emoji}/u.test(client.logo)) {
        return { type: 'emoji', value: client.logo };
      }
    }
    // Generar iniciales
    const initials = client.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return { type: 'initials', value: initials };
  };

  // Helper para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return {
    clients,
    setClients,
    searchTerm,
    setSearchTerm,
    filteredClients,
    isLoading,
    setIsLoading,
    pagination,
    setPagination,
    getClientDisplay,
    formatDate,
  };
}