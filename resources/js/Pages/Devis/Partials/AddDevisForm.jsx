import React, { useState, useEffect } from "react";
import { LigneDevis } from "../../../Components/LigneDevis";
import { useForm } from "@inertiajs/react";
import ModalCalcul from "../../../Modal/ModalCalcul.jsx";
import PrimaryButton from "@/Components/PrimaryButton";
import { PlusIcon } from "@heroicons/react/20/solid";

//G:\HEG_IG\projetGREP\PDSM_DOMITY_SNC\resources\js\Modal
export default function AddDevisForm({ success, projectId, auth }) {
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
        ], // Initialisez lignesDevis comme un tableau
        ajustements: [],
        projectId: localProjectId,
    });

    function getUID() {
        // Get the timestamp and convert
        // it into alphanumeric input
        return Date.now().toString(36);
    }

    useEffect(() => {
        // Assurez-vous que cette mise à jour ne se produit que lorsque nécessaire
        if (localProjectId !== data.projectId) {
            setData((currentData) => ({
                ...currentData,
                projectId: localProjectId,
            }));
        }
    }, [localProjectId]); // Dépend uniquement de localProjectId

    useEffect(() => {
        if (projectId) {
            localStorage.setItem("projectId", projectId);
            setLocalProjectId(projectId); // Mettre à jour l'état local
        } else {
            const storedProjectId = localStorage.getItem("projectId");
            if (storedProjectId) {
                setLocalProjectId(storedProjectId); // Utiliser l'état local pour conserver projectId
            }
        }
    }, [projectId]);

    const handleAjouterLigne = () => {
        // Obtenez le dernier ID et ajoutez 1
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
        // Ajoutez le nouvel ajustement au tableau existant d'ajustements
        setData((prevData) => ({
            ...prevData,
            ajustements: [...prevData.ajustements, newAjustement],
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/devis/store", data, {
            onSuccess: (response) => {
                // Supposons que votre API retourne l'ID du devis créé dans la réponse
                setCreatedDevisId(response.data.devisId);
                setShowModal(true);
            },
        });
    };

    // Fonction pour mettre à jour les données du formulaire
    const handleSaveData = (id, newData) => {
        setData((currentData) => {
            const updatedLignesDevis = currentData.libelles.map((ligne) =>
                ligne.id === id ? { ...ligne, ...newData } : ligne
            );

            // Retourne un nouvel objet data avec les LignesDevis mises à jour
            return { ...currentData, libelles: updatedLignesDevis };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold leading-7 text-primaryDarkBlue mt-8 mb-4">
                Ajouter un devis
            </h2>
            <h5>Vous pouvez cliquez sur "Retour" et ajouter une devis plus tard</h5>
            <div className="ajustements-section mt-4 max-h-40 overflow-auto border border-gray-300 shadow rounded-lg">
                {data.ajustements.map((ajustement, index) => (
                    <div
                        key={index}
                        className="ajustement-item p-2 border-b last:border-b-0"
                    >
                        Ajustement : {ajustement.nomAjustement} - Taux :{" "}
                        {ajustement.taux}%
                        <button type="button"
                                onClick={() => handleSupprimerAjustement(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
            <div
                className="min-h-[400px] max-h-[400px] overflow-auto border border-gray-300 shadow rounded-lg w-full max-w-6xl my-10">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix
                            Unitaire
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TVA
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix
                            HT
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix
                            TTC
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.libelles.map((ligne, index) => (
                        <LigneDevis
                            id={ligne.id}
                            index={index}
                            prest_designation={ligne.designation}
                            prest_quantite={ligne.quantite}
                            prest_prix={ligne.prixUnitaire}
                            prest_tva={ligne.tva}
                            onDelete={(e) => handleSupprimerLigne(e, ligne.id)}
                            onSave={(data) => handleSaveData(ligne.id, data)}
                            errors={errors}
                        />
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-end space-x-4 mt-10 mr-8">
                    <button
                        type="button"
                        onClick={handleAjouterLigne}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Ajouter Ligne
                    </button>
                    <PrimaryButton disabled={processing} className="bg-green-500 hover:bg-green-700">
                        Sauvegarder le Devis
                    </PrimaryButton>
                </div>
                <div className="ml-8">
                    <ModalCalcul tab={data} ajustement={handleAjustement}/>
                </div>
            </div>
        </form>

        /* <ModalGenerationPDF
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                        setShowModal(false);
                        window.location.href = `/devis/generate-pdf/${createdDevisId}`;
                    }}
                /> */
    );
}
