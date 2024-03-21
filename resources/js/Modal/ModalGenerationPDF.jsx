import React from 'react';

export default function ModalGenerationPDF({isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Voulez-vous générer un PDF pour ce devis ?</h2>
                <button onClick={onConfirm}>Oui</button>
                <button onClick={onClose}>Non</button>
            </div>
        </div>
    );
}
