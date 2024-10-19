import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Ne rien afficher si le modal est fermé

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {/* Contenu du modal */}
        <div className="modal-content">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 float-right"
          >
            &#x2715; {/* Icône de fermeture */}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}