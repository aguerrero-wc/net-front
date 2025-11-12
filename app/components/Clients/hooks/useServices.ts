// app/components/Clients/hooks/useServices.ts
import { useState } from "react";

export interface Service {
  id: number | string;
  serviceType: string;
  isActive: boolean;
  credentials: Record<string, any>;
}

const INITIAL_SERVICE_STATE = {
  serviceType: "",
  isActive: true,
  credentials: {}
};

export function useServices(initialServices: Service[] = []) {
  const [servicios, setServicios] = useState<Service[]>(
    initialServices.map((s, i) => ({ ...s, id: s.id || Date.now() + i }))
  );
  const [nuevoServicio, setNuevoServicio] = useState(INITIAL_SERVICE_STATE);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [servicioEnEdicion, setServicioEnEdicion] = useState<Service | null>(null);

  const agregarServicio = () => {
    if (!nuevoServicio.serviceType.trim()) return;

    if (servicioEnEdicion) {
      // MODO EDICIÓN
      setServicios(prev => prev.map(s => 
        s.id === servicioEnEdicion.id 
          ? { ...nuevoServicio, id: s.id }
          : s
      ));
      setServicioEnEdicion(null);
    } else {
      // MODO CREAR
      const servicioConId: Service = {
        ...nuevoServicio,
        id: Date.now(),
      };
      setServicios(prev => [...prev, servicioConId]);
    }

    setNuevoServicio(INITIAL_SERVICE_STATE);
    setMostrarFormulario(false);
  };

  // 🆕 NUEVA FUNCIÓN PARA EDITAR
  const editarServicio = (servicio: Service) => {
    setNuevoServicio({
      serviceType: servicio.serviceType,
      isActive: servicio.isActive,
      credentials: {}, // ⚠️ Vacío por seguridad, no mostramos las credenciales
    });
    setServicioEnEdicion(servicio);
    setMostrarFormulario(true);
  };

  const eliminarServicio = (id: number | string) => {
    setServicios(prev => prev.filter(s => s.id !== id));
  };

  const toggleServicioActivo = (id: number | string) => {
    setServicios(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setNuevoServicio(INITIAL_SERVICE_STATE);
    setServicioEnEdicion(null);
  };

  return {
    servicios,
    nuevoServicio,
    setNuevoServicio,
    mostrarFormulario,
    setMostrarFormulario,
    agregarServicio,
    editarServicio, // 🆕 Exportar nueva función
    eliminarServicio,
    toggleServicioActivo,
    cancelarFormulario,
    servicioEnEdicion, // 🆕 Exportar estado
  };
}