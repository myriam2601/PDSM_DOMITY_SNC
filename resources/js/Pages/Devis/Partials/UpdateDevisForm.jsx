import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { LigneDevis } from "@/Components/LigneDevis";
import ModalCalcul from "@/Modal/ModalCalcul";
import ModalIndex from "@/Pages/Libelles/ModalIndex";

export default function UpdateDevisForm({
    auth,
    devis,
    libellesModal,
    hasFullRights,
}) {
    const dev_liste_prestation = JSON.parse(devis.dev_liste_prestation);

    const libelles = dev_liste_prestation["libelles"];
    const ajustements = dev_liste_prestation["ajustements"];

    const [statut, setStatut] = useState(devis.dev_status);
    const [isLibelleModalOpen, setLibelleModalOpen] = useState(false);
    const { data, setData, patch, processing, errors } = useForm({
        id: devis.id,
        ajustements: ajustements
            ? ajustements.map((item) => ({ ...item }))
            : [],
        libelles: libelles.map((item) => ({ ...item })),
        statutData: devis.dev_status,
    });

    function getUID() {
        return Date.now().toString(36);
    }

    useEffect(() => {
        setData((currentData) => ({
            ...currentData,
            statutData: statut,
        }));
    }, [statut]);

    const handleAjouterLigne = () => {
        const nouvelleLigne = {
            id: getUID(),
            designation: "",
            quantite: 1,
            prixUnitaire: 0,
            tva: 20,
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
        setData((currentData) => ({
            ...currentData,
            ajustements: currentData.ajustements.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    const handleStatutChange = (e) => {
        setStatut(e.target.value);
    };

    const handleSaveData = (id, newData) => {
        setData((currentData) => {
            const updatedLignesDevis = currentData.libelles.map((ligne) =>
                ligne.id === id ? { ...ligne, ...newData } : ligne
            );
            return { ...currentData, libelles: updatedLignesDevis };
        });
    };

    function handleAjustement(newAjustement) {
        setData((prevData) => ({
            ...prevData,
            ajustements: [...prevData.ajustements, newAjustement],
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("devis.update"), { data });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <div>
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
                        {devis.dev_nom}
                    </h2>
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="statut"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Statut du devis:
                        </label>
                        <select
                            id="statut"
                            value={statut}
                            onChange={handleStatutChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="en attente">En attente</option>
                            <option value="accepté">Accepté</option>
                            <option value="refusé">Refusé</option>
                        </select>
                    </div>
                </div>

                <div className="flex-grow overflow-auto border border-gray-300 shadow rounded-lg mb-4">
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
                                    libelles={libellesModal}
                                    errors={errors}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4">
                    {data.ajustements.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Ajustements:
                            </h3>
                            {data.ajustements.map((ajustement, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 bg-white border-b last:border-b-0"
                                >
                                    <span>
                                        {ajustement.nomAjustement} - Taux:{" "}
                                        {ajustement.taux}%
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSupprimerAjustement(index)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-4">
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
                <ModalCalcul tab={data} ajustement={handleAjustement} />
            </form>
        </div>
    );
}
