import { useState } from "react";

export interface Service {
  id: number;
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
  const [servicios, setServicios] = useState<Service[]>(initialServices);
  const [nuevoServicio, setNuevoServicio] = useState(INITIAL_SERVICE_STATE);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarServicio = () => {
    if (!nuevoServicio.serviceType.trim()) return;

    const servicioConId: Service = {
      ...nuevoServicio,
      id: Date.now()
    };

    setServicios(prev => [...prev, servicioConId]);
    setNuevoServicio(INITIAL_SERVICE_STATE);
    setMostrarFormulario(false);
  };

  const eliminarServicio = (id: number) => {
    setServicios(prev => prev.filter(s => s.id !== id));
  };

  const toggleServicioActivo = (id: number) => {
    setServicios(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setNuevoServicio(INITIAL_SERVICE_STATE);
  };

  return {
    servicios,
    nuevoServicio,
    setNuevoServicio,
    mostrarFormulario,
    setMostrarFormulario,
    agregarServicio,
    eliminarServicio,
    toggleServicioActivo,
    cancelarFormulario
  };
}