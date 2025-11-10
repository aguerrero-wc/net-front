import { useState } from "react";

export function useNotifications(
  initialReportes: string[] = [],
  initialAlertas: string[] = []
) {
  const [emailsReportes, setEmailsReportes] = useState<string[]>(initialReportes);
  const [emailsAlertas, setEmailsAlertas] = useState<string[]>(initialAlertas);
  const [nuevoEmailReporte, setNuevoEmailReporte] = useState("");
  const [nuevoEmailAlerta, setNuevoEmailAlerta] = useState("");

  const agregarEmailReporte = () => {
    const email = nuevoEmailReporte.trim();
    if (email && !emailsReportes.includes(email)) {
      setEmailsReportes(prev => [...prev, email]);
      setNuevoEmailReporte("");
    }
  };

  const agregarEmailAlerta = () => {
    const email = nuevoEmailAlerta.trim();
    if (email && !emailsAlertas.includes(email)) {
      setEmailsAlertas(prev => [...prev, email]);
      setNuevoEmailAlerta("");
    }
  };

  const eliminarEmailReporte = (email: string) => {
    setEmailsReportes(prev => prev.filter(e => e !== email));
  };

  const eliminarEmailAlerta = (email: string) => {
    setEmailsAlertas(prev => prev.filter(e => e !== email));
  };

  return {
    // Reportes
    emailsReportes,
    nuevoEmailReporte,
    setNuevoEmailReporte,
    agregarEmailReporte,
    eliminarEmailReporte,
    // Alertas
    emailsAlertas,
    nuevoEmailAlerta,
    setNuevoEmailAlerta,
    agregarEmailAlerta,
    eliminarEmailAlerta
  };
}