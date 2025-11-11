import { useState } from "react";

export interface Contact {
  id: number;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
  esContactoPrincipal: boolean;
  departamento: string;
}

const INITIAL_CONTACT_STATE = {
  nombre: "",
  cargo: "",
  telefono: "",
  email: "",
  esContactoPrincipal: false,
  departamento: ""
};

export function useContacts(initialContacts: Contact[] = []) {
  const [contactos, setContactos] = useState<Contact[]>(initialContacts);
  const [nuevoContacto, setNuevoContacto] = useState(INITIAL_CONTACT_STATE);
  const [mostrarFormulario, setMostrarFormulario] = useState(initialContacts.length === 0);

  const agregarContacto = () => {
    if (!nuevoContacto.nombre.trim() || !nuevoContacto.email.trim()) return;

    const contactoConId: Contact = {
      ...nuevoContacto,
      id: Date.now(),
      esContactoPrincipal: contactos.length === 0 ? true : nuevoContacto.esContactoPrincipal
    };

    // Si es principal, desmarcar los demás
    if (contactoConId.esContactoPrincipal) {
      setContactos(prev => prev.map(c => ({ ...c, esContactoPrincipal: false })));
    }

    setContactos(prev => [...prev, contactoConId]);
    setNuevoContacto(INITIAL_CONTACT_STATE);
    setMostrarFormulario(false);
  };

  const eliminarContacto = (id: number) => {
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  const marcarComoPrincipal = (id: number) => {
    setContactos(prev => prev.map(c => ({
      ...c,
      esContactoPrincipal: c.id === id
    })));
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setNuevoContacto(INITIAL_CONTACT_STATE);
  };

  return {
    contactos,
    nuevoContacto,
    setNuevoContacto,
    mostrarFormulario,
    setMostrarFormulario,
    agregarContacto,
    eliminarContacto,
    marcarComoPrincipal,
    cancelarFormulario
  };
}