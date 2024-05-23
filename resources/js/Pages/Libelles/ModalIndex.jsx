import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";
import ModalInsertion from "./ModalInsertion";
import ModalUpdate from "./ModalUpdate";

Modal.setAppElement("#app");

const ModalIndex = ({ libelles = [], response }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Tous les libellés
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Libelle Form"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-5xl h-4/5 bg-white shadow-lg rounded p-8 overflow-hidden"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <div className="flex flex-col h-full">
                    <h2 className="text-xl mb-4 font-semibold">
                        Liste des Libellés
                    </h2>
                    <div className="flex-grow overflow-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                        onClick={() =>
                                            demanderTri("lib_designation")
                                        }
                                    >
                                        Designation
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                        onClick={() => demanderTri("lib_code")}
                                    >
                                        Code
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                        onClick={() =>
                                            demanderTri("lib_ajustement")
                                        }
                                    >
                                        Ajustement
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtreEtTriLibelles().map(
                                    (libelle, index) =>
                                        libelle && (
                                            <tr
                                                key={index}
                                                className={
                                                    index % 2 === 0
                                                        ? "bg-gray-100"
                                                        : "bg-white"
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {libelle.lib_designation}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                    {libelle.lib_code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                    {libelle.lib_ajustement
                                                        ? "Oui"
                                                        : "Non"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedLibelle(
                                                                libelle
                                                            );
                                                            setUpdateModalOpen(
                                                                true
                                                            );
                                                        }}
                                                        className="text-blue-500 hover:text-blue-800 mr-4"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                libelle.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-800"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setInsertionModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ajouter un libellé
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
