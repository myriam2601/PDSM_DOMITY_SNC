import React, { useState, useEffect } from "react";
import { LigneDevis } from "../../../Components/LigneDevis";
import { useForm } from "@inertiajs/react";
import ModalCalcul from "../../../Modal/ModalCalcul.jsx";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalIndex from "@/Pages/Libelles/ModalIndex";

export default function AddDevisForm({
    success,
    projectId,
    auth,
    libellesModal,
    hasFullRights,
}) {
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const { data, setData, post, processing, errors } = useForm({
        libelles: [
            {
                id: getUID(),
                designation: "",
                quantite: 1,
                prixUnitaire: 0,
                tva: 7.8,
            },
        ],
        ajustements: [],
        projectId: localProjectId,
    });

    const [isLibelleModalOpen, setLibelleModalOpen] = useState(false);

    function getUID() {
        return Date.now().toString(36);
    }

    useEffect(() => {
        if (localProjectId !== data.projectId) {
            setData((currentData) => ({
                ...currentData,
                projectId: localProjectId,
            }));
        }
    }, [localProjectId]);

    useEffect(() => {
        if (projectId) {
            localStorage.setItem("projectId", projectId);
            setLocalProjectId(projectId);
        } else {
            const storedProjectId = localStorage.getItem("projectId");
            if (storedProjectId) {
                setLocalProjectId(storedProjectId);
            }
        }
    }, [projectId]);

    const handleAjouterLigne = () => {
        const nouvelleLigne = {
            id: getUID(),
            designation: "",
            quantite: 1,
            prixUnitaire: 0,
            tva: 7.8,
        };

        setData((currentData) => ({
            ...currentData,
            libelles: [...currentData.libelles, nouvelleLigne],
        }));
    };

    const handleSupprimerLigne = (id) => {
        const lignesMiseAJour = data.libelles.filter(
            (ligne) => ligne.id !== id
        );
        setData({ ...data, libelles: lignesMiseAJour });
    };

    const handleSupprimerAjustement = (indexToRemove) => {
        setData((data) => ({
            ...data,
            ajustements: data.ajustements.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    function handleAjustement(newAjustement) {
        setData((prevData) => ({
            ...prevData,
            ajustements: [...prevData.ajustements, newAjustement],
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/devis/store", data, {
            onSuccess: (response) => {
                setCreatedDevisId(response.data.devisId);
                setShowModal(true);
            },
        });
    };

    const handleSaveData = (id, newData) => {
        setData((currentData) => {
            const updatedLignesDevis = currentData.libelles.map((ligne) =>
                ligne.id === id ? { ...ligne, ...newData } : ligne
            );
            return { ...currentData, libelles: updatedLignesDevis };
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <div className={isLibelleModalOpen ? "overflow-hidden" : ""}>
            {hasFullRights && (
                <ModalIndex
                    libelles={libellesModal}
                    isOpen={isLibelleModalOpen}
                    onRequestClose={() => setLibelleModalOpen(false)}
                    zIndex={50}
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col"
                style={{ height: "70vh" }}
                onKeyDown={handleKeyDown} // Ajouter le gestionnaire onKeyDown ici
            >
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-xl font-semibold text-primaryDarkBlue mb-2">
                        Ajouter un devis
                    </h2>
                    <h5>
                        Vous pouvez cliquez sur "Retour" et ajouter un devis
                        plus tard
                    </h5>
                </div>

                <div className="ajustements-section mt-4 max-h-40 overflow-auto border border-gray-300 shadow rounded-lg w-full mb-4">
                    {data.ajustements.map((ajustement, index) => (
                        <div
                            key={index}
                            className="ajustement-item p-2 border-b last:border-b-0"
                        >
                            Ajustement : {ajustement.nomAjustement} - Taux :{" "}
                            {ajustement.taux}%
                            <button
                                type="button"
                                onClick={() => handleSupprimerAjustement(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex-grow overflow-auto border border-gray-300 shadow rounded-lg w-full mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-0">
                            {" "}
                            {/* Updated z-index */}
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Désignation
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Quantité
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Prix Unitaire
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    TVA
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Prix HT
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Prix TTC
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.libelles.map((ligne) => (
                                <LigneDevis
                                    key={ligne.id} // Use id as key
                                    id={ligne.id}
                                    prest_designation={ligne.designation}
                                    prest_quantite={ligne.quantite}
                                    prest_prix={ligne.prixUnitaire}
                                    prest_tva={ligne.tva}
                                    onDelete={() =>
                                        handleSupprimerLigne(ligne.id)
                                    }
                                    onSave={(data) =>
                                        handleSaveData(ligne.id, data)
                                    }
                                    errors={errors}
                                    libelles={libellesModal} // Passez la liste des libellés ici
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end space-x-4 mb-4 w-full">
                    <button
                        type="button"
                        onClick={handleAjouterLigne}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Ajouter Ligne
                    </button>
                    {hasFullRights && (
                        <button
                            type="button"
                            onClick={() => setLibelleModalOpen(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Libellés
                        </button>
                    )}
                    <PrimaryButton
                        disabled={processing}
                        className="bg-green-500 hover:bg-green-700"
                    >
                        Sauvegarder le Devis
                    </PrimaryButton>
                </div>
                <div className="ml-8">
                    <ModalCalcul tab={data} ajustement={handleAjustement} />
                </div>
            </form>
        </div>
    );
}
