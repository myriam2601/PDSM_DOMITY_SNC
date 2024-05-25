import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";
import ModalInsertion from "./ModalInsertion";
import ModalUpdate from "./ModalUpdate";

Modal.setAppElement("#app");

const ModalIndex = ({ libelles = [], response, isOpen, onRequestClose }) => {
    const [isInsertionModalOpen, setInsertionModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedLibelle, setSelectedLibelle] = useState(null);
    const [localLibelles, setLocalLibelles] = useState(libelles);
    const [tri, setTri] = useState({ colonne: null, direction: "asc" });

    const demanderTri = (colonne) => {
        const estAscendant = tri.colonne === colonne && tri.direction === "asc";
        setTri({
            colonne,
            direction: estAscendant ? "desc" : "asc",
        });
    };

    const filtreEtTriLibelles = () => {
        return localLibelles.sort((a, b) => {
            if (!tri.colonne) return 0;
            let valA = a[tri.colonne];
            let valB = b[tri.colonne];
            if (tri.direction === "asc") {
                return valA < valB ? -1 : 1;
            } else {
                return valA > valB ? -1 : 1;
            }
        });
    };

    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce libellé ?")) {
            router.delete(`/libelle/${id}`, {
                onSuccess: (page) => {
                    console.log("Suppression réussie, données reçues:", page);
                    setLocalLibelles(
                        localLibelles.filter((libelle) => libelle.id !== id)
                    );
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression:", errors);
                },
            });
        }
    };

    const handleAddLibelle = (newLibelle) => {
        setLocalLibelles([...localLibelles, newLibelle]);
    };

    const handleUpdateLibelle = (updatedLibelle) => {
        setLocalLibelles(
            localLibelles.map((libelle) =>
                libelle.id === updatedLibelle.id ? updatedLibelle : libelle
            )
        );
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Libelle Form"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-5xl h-4/5 bg-white shadow-lg rounded p-8 overflow-hidden"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Liste des Libellés</h2>
                        <button
                            onClick={onRequestClose}
                            className="text-red-600 hover:text-red-800"
                        >
                            Fermer
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100 border-b">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                                    onClick={() => demanderTri("lib_designation")}
                                >
                                    Designation
                                </th>
                                <th
                                    scope="col"
                                    className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                                    onClick={() => demanderTri("lib_code")}
                                >
                                    Code
                                </th>
                                <th
                                    scope="col"
                                    className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer"
                                    onClick={() => demanderTri("lib_ajustement")}
                                >
                                    Ajustement
                                </th>
                                <th
                                    scope="col"
                                    className="text-left py-3 px-4 font-medium text-gray-600"
                                >
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filtreEtTriLibelles().map((libelle, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                        {libelle.lib_designation}
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-500">
                                        {libelle.lib_code}
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-500">
                                        {libelle.lib_ajustement ? "Oui" : "Non"}
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-500 flex space-x-4">
                                        <button
                                            onClick={() => onEdit(libelle)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => onDelete(libelle.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button
                    onClick={() => setInsertionModalOpen(true)}
                    className="w-full bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                >
                    Créer un libellé
                </button>

                <ModalInsertion
                    isOpen={isInsertionModalOpen}
                    onRequestClose={() => setInsertionModalOpen(false)}
                    onSuccess={handleAddLibelle}
                />

                <ModalUpdate
                    isOpen={isUpdateModalOpen}
                    onRequestClose={() => setUpdateModalOpen(false)}
                    libelle={selectedLibelle}
                    onSuccess={handleUpdateLibelle} // Passez la fonction de succès ici
                />
            </Modal>
        </div>
    );
};

export default ModalIndex;
