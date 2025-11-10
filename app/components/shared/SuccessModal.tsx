// app/components/shared/SuccessModal.tsx

import { Modal } from "./Modal";
import { Link } from "@remix-run/react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title, 
  message,
  actionLabel = "Ver detalles",
  actionUrl 
}: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Body>
        <div className="text-center py-6">
          {/* Icono de éxito animado */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          
          {/* Mensaje */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all font-medium"
            >
              Cerrar
            </button>
            
            {actionUrl && (
              <Link
                to={actionUrl}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all font-semibold"
              >
                {actionLabel}
              </Link>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}