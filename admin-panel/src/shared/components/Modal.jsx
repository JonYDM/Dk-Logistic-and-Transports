import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const sizeVariants = {
  sm: 'max-w-md w-full',
  md: 'max-w-lg w-full',
  lg: 'max-w-2xl w-full',
  xl: 'max-w-4xl w-full',
};

const Modal = ({ open, onClose, children, size = 'md', className = '', title }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Fondo clickeable para cerrar */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative mx-auto bg-white rounded-3xl shadow-2xl p-0 animate-fade-in overflow-hidden',
          sizeVariants[size] || sizeVariants.md,
          className
        )}
        style={{ animation: 'fadeIn 0.2s' }}
      >
        {/* Header con título y botón de cierre */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Botón de cierre cuando no hay título */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10 focus:outline-none hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
