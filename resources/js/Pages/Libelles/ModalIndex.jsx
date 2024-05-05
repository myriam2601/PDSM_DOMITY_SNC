import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalInsertion from './ModalInsertion';  // Assurez-vous que le chemin est correct

Modal.setAppElement('#app');

const ModalIndex = ({ libelles }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [insertModalOpen, setInsertModalOpen] = useState(false);

    const openInsertModal = () => {
        setModalIsOpen(false); // Ferme ModalIndex
        setInsertModalOpen(true); // Ouvre ModalInsertion
    };

    return (
        <div>
            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Ouvrir Modal Libellés
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Libelle Form"
                className="fixed inset-0 m-auto bg-white rounded shadow-lg z-50 overflow-y-auto w-1/2 h-3/4 p-8"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <h2>Liste des Libellés</h2>
                <div className="overflow-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Designation</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {libelles.map((libelle, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{libelle.lib_designation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{libelle.lib_code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={openInsertModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Ajouter un nouveau libellé
                    </button>
                    <button onClick={() => setModalIsOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Fermer
                    </button>
                </div>
                <ModalInsertion isOpen={insertModalOpen} onRequestClose={() => setInsertModalOpen(false)} />
            </Modal>
            
        </div>
    );
};

export default ModalIndex;
